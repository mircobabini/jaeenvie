MemGest = {
	ram: new Array(65536),
	memoryUpdated: 0, // questo val iniziale è a caso, viene settato semprre al'avvio della cpu

	reset: function() {
		for (var i = 0; i < this.ram.length; ++i)
			this.ram[i] = 0;
	},
	// Load the data from the array into the Cpu memory
	// starting at address.
	load: function (address, data) {
		for (var i = 0; i < data.length; ++i)
			this.ram[address + i] = data[i];
	},
	getByte: function (addr) {
		return this.ram[addr];
	},
	getWord: function (addr) {
		var ram = this.ram;
		var l = ram[addr];
		var h = ram[addr + 1];
		return h << 8 | l;
	},
	writeByte: function (addr, value) {
		// Can't write to ROM
		if (addr < 0x2000 || addr > 0xFFFF)
			return;

		var v = value & 0xFF;
		this.ram[addr] = v;
		if (this.memoryUpdated)
			this.memoryUpdated.apply (this, [addr, v]);
	},

	writeWord: function (addr, value) {
		var l = value;
		var h = value >> 8;
		this.writeByte(addr, l);
		this.writeByte(addr+1, h);
	}
}
