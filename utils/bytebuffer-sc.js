'use strict';

var ByteBuffer = module.exports = require('bytebuffer');

/**
 * Reads a 32bit base 128 variable-length integer using supercell magic.
 * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
 *  written if omitted.
 * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
 *  and the actual number of bytes read.
 * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
 *  to fully decode the varint.
 * @expose
 */
ByteBuffer.prototype.readRrsInt32 = function(offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;
    if (!this.noAssert) {
        if (typeof offset !== 'number' || offset % 1 !== 0)
            throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 1 > this.buffer.length)
            throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 1 + ") <= " + this.buffer.length);
    }
    var c = 0,
        value = 0 >>> 0,
        seventh,
        msb,
        b;
    do {
        if (!this.noAssert && offset > this.limit) {
            var err = Error("Truncated");
            err.truncated = true;
            throw err;
        }
        b = this.buffer[offset++];

        if (c === 0) {
            seventh = (b & 0x40) >> 6; // save 7th bit
            msb = (b & 0x80) >> 7; // save msb
            b = b << 1; // rotate to the left
            b = b & ~(0x181); // clear 8th and 1st bit and 9th if any
            b = b | (msb << 7) | (seventh); // insert msb and 6th back in
        }

        value |= (b & 0x7f) << (7 * c);
        ++c;
    } while ((b & 0x80) !== 0);

    value = ((value >>> 1) ^ -(value & 1)) | 0;

    if (relative) {
        this.offset = offset;
        return value;
    }

    return {
        "value": value,
        "length": c
    };
};

/**
 * Writes a 32bit base 128 variable-length integer using supercell magic.
 * @param {number} value Value to write
 * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
 *  written if omitted.
 * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
 * @expose
 */
ByteBuffer.prototype.writeRrsInt32 = function(value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;
    if (!this.noAssert) {
        if (typeof value !== 'number' || value % 1 !== 0)
            throw TypeError("Illegal value: " + value + " (not an integer)");
        value |= 0;
        if (typeof offset !== 'number' || offset % 1 !== 0)
            throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 0 > this.buffer.length)
            throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }
    var size = ByteBuffer.calculateVarint32(value),
        rotate = true,
        b;
    offset += size;
    var capacity10 = this.buffer.length;
    if (offset > capacity10)
        this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
    offset -= size;

    value = (value << 1) ^ (value >> 31);

    value >>>= 0;
    while (value) {
        b = (value & 0x7f);
        if (value >= 0x80)
            b |= 0x80;
        if (rotate) {
            rotate = false;
            var lsb = b & 0x1;
            var msb = (b & 0x80) >> 7;
            b = b >> 1; // rotate to the right
            b = b & ~(0xC0); // clear 7th and 6th bit
            b = b | (msb << 7) | (lsb << 6); // insert msb and lsb back in
        }
        this.buffer[offset++] = b;
        value >>>= 7;
    }
    if (relative) {
        this.offset = offset;
        return this;
    }
    return size;
};

/**
 * Reads a length as uint32 prefixed UTF8 encoded string. Supercell also has FF FF FF FF for len when string is empty so
 * we override it
 * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
 *  read if omitted.
 * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
 *  read and the actual number of bytes read.
 * @expose
 * @see ByteBuffer#readVarint32
 */
ByteBuffer.prototype.readIString = function(offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;
    if (!this.noAssert) {
        if (typeof offset !== 'number' || offset % 1 !== 0)
            throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 4 > this.buffer.length)
            throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 4 + ") <= " + this.buffer.length);
    }
    var start = offset;
    var len = this.readUint32(offset);

    if (len == Math.pow(2, 32) - 1) {
        this.offset += 4;
        return '';
    } else {
        var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
        offset += str.length;
        if (relative) {
            this.offset = offset;
            return str.string;
        } else {
            return {
                'string': str.string,
                'length': offset - start
            };
        }
    }
};

/**
 * Writes a length as uint32 prefixed UTF8 encoded string -- supercell wants FFFFFFFF instead of 00000000 when empty.
 * @param {string} str String to write
 * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
 *  written if omitted.
 * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
 * @expose
 * @see ByteBuffer#writeVarint32
 */
ByteBuffer.prototype.writeIString = function(str, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;
    if (!this.noAssert) {
        if (typeof str !== 'string')
            throw TypeError("Illegal str: Not a string");
        if (typeof offset !== 'number' || offset % 1 !== 0)
            throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 0 > this.buffer.length)
            throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }
    var start = offset,
        k;
    k = Buffer.byteLength(str, "utf8");
    offset += 4 + k;
    var capacity13 = this.buffer.length;
    if (offset > capacity13)
        this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
    offset -= 4 + k;
    if(k === 0) { // supercell wants FF ^_^
        this.buffer[offset + 3] = 0xFF;
        this.buffer[offset + 2] = 0xFF;
        this.buffer[offset + 1] = 0xFF;
        this.buffer[offset] = 0xFF;
    } else if (this.littleEndian) {
        this.buffer[offset + 3] = (k >>> 24) & 0xFF;
        this.buffer[offset + 2] = (k >>> 16) & 0xFF;
        this.buffer[offset + 1] = (k >>> 8) & 0xFF;
        this.buffer[offset] = k & 0xFF;
    } else {
        this.buffer[offset] = (k >>> 24) & 0xFF;
        this.buffer[offset + 1] = (k >>> 16) & 0xFF;
        this.buffer[offset + 2] = (k >>> 8) & 0xFF;
        this.buffer[offset + 3] = k & 0xFF;
    }
    offset += 4;
    offset += this.buffer.write(str, offset, k, "utf8");
    if (relative) {
        this.offset = offset;
        return this;
    }
    return offset - start;
};
