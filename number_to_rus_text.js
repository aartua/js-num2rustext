numberToRusText = {
	text: '',
	texts_before_ten: [
		"один",
		"два",
		"три",
		"четыре",
		"пять",
		"шесть",
		"семь",
		"восемь",
		"девять"
	],
	texts_before_twenty: [
		"десять",
		"одиннацать",
		"двенадцать",
		"тринадцать",
		"четырнадцать",
		"пятнадцать",
		"шестнадцать",
		"семнадцать",
		"восемнадцать",
		"девятнадцать"
	],
	texts_before_hundred: [
		"двадцать",
		"тридцать",
		"сорок",
		"пятьдесят",
		"шестьдесят",
		"семьдесят",
		"восемдесят",
		"девяносто"
	],
	texts_hundreds: [
		"сто",
		"двести",
		"триста",
		"четыреста",
		"пятьсот",
		"шестьсот",
		"семьсот",
		"восемьсот",
		"девятьсот"
	],
	tests_spell_one: ['одна'],
	tests_spell_two: ['два', 'две'],
	tests_spell_thousand: ['тысяча', 'тысячи', 'тысяч'],

	spell: function(number, options)
	{
		message = '';
		number = Math.abs(number);
		if (number % 100 > 10 && number % 100 < 20) {
			message = options[2];

		} else {
			switch (number % 10) {
				case 0: message = options[2]; break;
				case 1: message = options[0]; break;
				case 2: message = options[1]; break;
				case 3: message = options[1]; break;
				case 4: message = options[1]; break;
				case 5: message = options[2]; break;
				case 6: message = options[2]; break;
				case 7: message = options[2]; break;
				case 8: message = options[2]; break;
				case 9: message = options[2]; break;
			}
		}
		return message
	},

	run: function(number)
	{
		if (isNaN(number)) {
			return false;
		}
		number = Math.abs(number);
		switch (number.toString().length) {
			case 1:
				this.setPartText(this.texts_before_ten[number - 1]);
				number = 0;
				break;
			case 2:
				if (number == 10) {
					this.setPartText(this.texts_before_twenty[0]);
					number = 0;
				} else if (number < 20) {
					this.setPartText(this.texts_before_twenty[number - 10]);
					number = 0;
				}
				else {
					if (number % 10 == 0) {
						this.setPartText(this.texts_before_hundred[number / 10 - 2]);
						number = 0;
					} else {
						decade = number.toString().charAt(0) * 10;
						this.run(decade);
						number -= decade;
					}
				}
				break;
			case 3:
				if (number % 100 == 0) {
					this.setPartText(this.texts_hundreds[number / 100 - 1]);
					number = 0;
				} else {
					decade = number.toString().charAt(0) * 100;
					this.run(decade);
					number -= decade;
				}
				break;
			case 4: case 5: case 6:
			thousand = Math.floor(number / 1000);
			if (thousand == 1 ) {
				this.setPartText(this.spell(thousand, this.tests_spell_one));
			} else if (thousand == 2) {
				this.setPartText(this.spell(thousand, this.tests_spell_two));
			} else {
				this.run(thousand);
			}
			number -= thousand * 1000;
			this.setPartText(this.spell(thousand, this.tests_spell_thousand));
			break;
		}
		if (number > 0) {
			this.run(number);
		}
	},

	setPartText: function(text)
	{
		this.text += text + ' ';
	},

	get: function (number)
	{
		this.text = '';
		this.run(number);
		return this.text;
	},

	write: function (number)
	{
		this.text = '';
		this.run(number);
		document.write(this.text);
	},

	log: function(number)
	{
		this.text = '';
		this.run(number);
		console.log(this.text);
	}
}