/*
	The legend of Zelda: Breath of the wild v20180412
	by Marc Robledo 2017-2018
*/
var currentEditingItem=0;

SavegameEditor={
	Name:'The legend of Zelda: Breath of the wild',
	Filename:'game_data.sav',
	Version:20180408,

	/* Constants */
	Constants:{
		MAX_ITEMS:410,
		STRING_SIZE:0x80,

		/*						 v1.0    v1.1    v1.2    v1.3    v1.3.3   v1.4     v1.5 */
		FILESIZE:				[896976, 897160, 897112, 907824, 1020648, 1027208, 1027208],
		HEADER:					[0x24e2, 0x24ee, 0x2588, 0x29c0, 0x3ef8,  0x471a,  0x471b],
		VERSION:				['1.0',  '1.1',  '1.2',  '1.3', '1.3.3',  'v1.4',  'v1.5'],

		MAP_ICONS: 0x9383490e,
		MAP_POS: 0xea9def3f,
		ICON_TYPES:{SWORD: 27, BOW:28, SHIELD:29, POT:30, STAR:31, CHEST:32,SKULL:33,LEAF:34,TOWER:35}
	},

	/* Offsets */
	OffsetsAll:{
		/*						 hash        v1.0      v1.1      v1.2      v1.3      v1.3.3    v1.4      v1.5 */
		RUPEES:					[0x23149bf8, 0x00e0a0, 0x00e110, 0x00e110, 0x00e678, 0x00e730, 0x00eaf8, 0x00eaf8],
		MONS:					[0xce7afed3, 0x0bc480, 0x0bc558, 0x0bc538, 0x0be728, 0x0d6ac8, 0x0d7fa8, 0x0d7fa8],
		ITEMS:					[0x5f283289, 0x052828, 0x0528d8, 0x0528c0, 0x053890, 0x05fa48, 0x060408, 0x060408],
		ITEMS_QUANTITY:			[0x6a09fc59, 0x063340, 0x0633f0, 0x0633d8, 0x064550, 0x070730, 0x0711c8, 0x0711c8],

		FLAGS_WEAPON:			[0x57ee221d, 0x050328, 0x0503d8, 0x0503c0, 0x051270, 0x05d420, 0x05dd20, 0x05dd20],
		FLAGSV_WEAPON:			[0xa6d926bc, 0x0a9ca8, 0x0a9d78, 0x0a9d58, 0x0ab8d0, 0x0c3bd8, 0x0c4c68, 0x0c4c68],
		FLAGS_BOW:				[0x0cbf052a, 0x0045f0, 0x0045f8, 0x0045f8, 0x0047e8, 0x004828, 0x004990, 0x004990],
		FLAGSV_BOW:				[0x1e3fd294, 0x00a8e0, 0x00a940, 0x00a940, 0x00ae08, 0x00ae90, 0x00b1e0, 0x00b1e0],
		FLAGS_SHIELD:			[0xc5238d2b, 0x0b5810, 0x0b58e8, 0x0b58c8, 0x0b7910, 0x0cfc70, 0x0d1038, 0x0d1038],
		FLAGSV_SHIELD:			[0x69f17e8a, 0x063218, 0x0632c8, 0x0632b0, 0x064420, 0x070600, 0x071098, 0x071098],

		HORSE_SADDLES:			[0x333aa6e5, 0x03d0e8, 0x03d190, 0x03d190, 0x03d9d8, 0x049ab8, 0x04a008, 0x04a008],
		HORSE_REINS:			[0x6150c6be, 0x060508, 0x0605b8, 0x0605a0, 0x0615d0, 0x06d7a0, 0x06e190, 0x06e190],
		HORSE_NAMES:			[0x7b74e117, 0x070320, 0x0703c0, 0x0703a8, 0x071820, 0x07da30, 0x07e640, 0x07e640],
		HORSE_MANES:			[0x9c6cfd3f, 0x0a6478, 0x0a6538, 0x0a6520, 0x0a7f18, 0x0c01c0, 0x0c1168, 0x0c1168],
		HORSE_TYPES:			[0xc247b696, 0x0b46f8, 0x0b47d8, 0x0b47b8, 0x0b6780, 0x0cead8, 0x0cfe40, 0x0cfe40],
		HORSE_BONDS:			[0xe1a0ca54, 0x0c3670, 0x0c3738, 0x0c3710, 0x0c5bb0, 0x0de2a0, 0x0df960, 0x0df960], /* max=0x3f80 */
		HORSE_POSITION:			[0x982ba201, 0x07aed0, 0x07af90, 0x07af78, 0x07c8f8, 0x088b78, 0x089a80, 0x089a80],

		KOROK_SEED_COUNTER:		[0x8a94e07a, 0x076148, 0x0761f8, 0x0761e0, 0x0778f8, 0x083b60, 0x084908, 0x084908],
		DEFEATED_HINOX_COUNTER:	[0x54679940, 0x04d2b8, 0x04d368, 0x04d358, 0x04e158, 0x05a2f0, 0x05ab78, 0x05ab78],
		DEFEATED_TALUS_COUNTER:	[0x698266be, 0x063010, 0x0630c0, 0x0630a8, 0x064218, 0x0703f0, 0x070e88, 0x070e88],
		DEFEATED_MOLDUGA_COUNTER:[0x441b7231, 0x0466d0, 0x046788, 0x046780, 0x0472a8, 0x0533e8, 0x053b00, 0x053b00],

		PLAYTIME:				[0x73c29681, 0x067888, 0x067920, 0x067908, 0x068c40, 0x074e40, 0x075998, 0x075998],

		RELIC_GERUDO:			[0x97f925c3, 0x07adc0, 0x07ae80, 0x07ae68, 0x07c7e0, 0x088a60, 0x089968, 0x089968],
		RELIC_GORON:			[0xf1cf4807, 0x0cb3c0, 0x0cb488, 0x0cb460, 0x0cdbf8, 0x0e6340, 0x0e7ba0, 0x0e7ba0],
		RELIC_RITO:				[0xfda0cde4, 0x0da0d8, 0x0da190, 0x0da160, 0x0dcac0, 0x0f8370, 0x0f9cc8, 0x0f9cc8],

		MOTORCYCLE:				[0xc9328299, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x0d2660, 0x0d2660], /* IsGet_Obj_Motorcycle */

		PLAYER_POSITION:		[0xa40ba103, 0x0a8cd8, 0x0a8da8, 0x0a8d90, 0x0aa8a8, 0x0c2b98, 0x0c3bf0, 0x0c3bf0],
		MAP:                    [0x0bee9e46, 0x004128, 0x004130, 0x004130, 0x004310, 0x004348, 0x0044a0, 0x0044a0],
		MAPTYPE:                [0xd913b769, 0x0c0588, 0x0c0658, 0x0c0630, 0x0c29b0, 0x0db080, 0x0dc658, 0x0dc658]
	},


	/* private functions */
	_toHexInt:function(i){var s=i.toString(16);while(s.length<8)s='0'+s;return '0x'+s},
	_writeBoolean:function(offset,val,arrayPos){if(arrayPos)tempFile.writeInt(offset+8*i,val?1:0);else tempFile.writeInt(offset,val?1:0)},
	_writeValue:function(offset,val,arrayPos){if(arrayPos)tempFile.writeInt(offset+8*i,val);else tempFile.writeInt(offset,val)},
	_writeString:function(offset,str){
		for(var i=0; i<16; i++){
			tempFile.writeBytes(offset,[0,0,0,0]);
			var fourBytes=str.substr(i*4, 4);
			for(j=0; j<fourBytes.length; j++){
				tempFile.writeByte(offset+j, fourBytes.charCodeAt(j));
			}
			offset+=8;
		}
	},
	_writeStringShort:function(offset,str){
		for(var i=0; i<8; i++){
			tempFile.writeBytes(offset,[0,0,0,0]);
			var fourBytes=str.substr(i*4, 4);
			for(j=0; j<fourBytes.length; j++){
				tempFile.writeByte(offset+j, fourBytes.charCodeAt(j));
			}
			offset+=8;
		}
	},

	_searchHash:function(hash){
		for(var i=0x0c; i<tempFile.fileSize; i+=8)
			if(hash===tempFile.readInt(i))
				return i;
		return false;
	},
	_readFromHash:function(hash){
		var offset=this._searchHash(hash);
		if(typeof offset === 'number')
			return tempFile.readInt(offset+4);
		return false;
	},
	_writeValueAtHash:function(hash,val){
		var offset=this._searchHash(hash);
		if(typeof offset==='number')
			this._writeValue(offset+4,val);
	},

	_getOffsets(v){
		this.Offsets={};
		if(v<this.OffsetsAll.RUPEES.length){
			for(prop in this.OffsetsAll){
				this.Offsets[prop]=this.OffsetsAll[prop][v+1];
			}
		}else{ /* unknown version */
			var textarea=document.createElement('textarea');
			for(prop in this.OffsetsAll){
				var offset=this._searchHash(this.OffsetsAll[prop][0]);
				if(offset){
					textarea.value+=prop+':0x'+(offset+4).toString(16)+',\n';
					this.Offsets[prop]=offset+4;
				}
			}
			document.body.appendChild(textarea);
		}
	},


	_getItemTranslation:function(itemId){
		for(var i=0; i<BOTW_Data.Translations.length; i++)
			if(BOTW_Data.Translations[i].items[itemId])
				return BOTW_Data.Translations[i].items[itemId];
		return '<span style="color:red">'+itemId+'</span>'
	},
	_getItemCategory:function(itemId){
		for(var i=0; i<BOTW_Data.Translations.length; i++)
			if(BOTW_Data.Translations[i].items[itemId])
				return BOTW_Data.Translations[i].id;
		return 'other'
	},

	_readString:function(offset){
		var txt='';
		for(var j=0; j<16; j++){
			txt+=tempFile.readString(offset,4);
			offset+=8;
		}
		return txt
	},

	_loadItemName:function(i){
		return this._readString(this.Offsets.ITEMS+i*0x80);
	},
	_writeItemName:function(i,newItemNameId){
		this._writeString(this.Offsets.ITEMS+i*0x80, newItemNameId);
	},
	_getItemMaximumQuantity:function(itemId){
		var cat=this._getItemCategory(itemId);
		if(itemId.endsWith('Arrow') || itemId.endsWith('Arrow_A') || cat==='materials' || cat==='food'){
			return 999;
		}else if(cat==='weapons' || cat==='bows' || cat==='shields'){
			return 6553500;
		}else if(itemId==='Obj_DungeonClearSeal'){
			return 120
		}else if(itemId==='Obj_KorokNuts'){
			return 900
		}else{
			return 0xffffffff;
		}
	},
	_getItemQuantityOffset:function(i){
		return this.Offsets.ITEMS_QUANTITY+i*0x08;
	},
	_getItemRow(i){
		return getField('number-item'+i).parentElement.parentElement
	},
	_createItemRow(i,itemCat){
		var itemNameId=this._loadItemName(i);
		var itemVal=tempFile.readInt(this._getItemQuantityOffset(i));

		var img=new Image();
		img.id='icon'+i;
		img.className='clickable';
		img.src=BOTW_Icons.getBlankIcon();

		img.addEventListener('click', function(){
			SavegameEditor.editItem(i);
		}, false);
		/*img.addEventListener('error', function(){
			img.src=BOTW_Icons.getBlankIcon();
		}, false);*/

		var itemNumber=document.createElement('span');
		itemNumber.className='item-number';
		itemNumber.innerHTML='#'+i;

		var span=document.createElement('span');
		span.id='item-name'+i;
		span.innerHTML=this._getItemTranslation(itemNameId);


		var input;
		if(itemCat && itemCat==='clothes'){
			input=select('item'+i, BOTW_Data.DYE_COLORS, function(){
				BOTW_Icons.setIcon(img, SavegameEditor._loadItemName(i), parseInt(this.value));
			});
			input.value=itemVal;

			BOTW_Icons.setIcon(img, itemNameId, itemVal);
		}else{
			input=inputNumber('item'+i, 0, this._getItemMaximumQuantity(itemNameId), itemVal);
			BOTW_Icons.setIcon(img, itemNameId);
		}

		var r=row([1,6,3,2],
			img,
			span,
			document.createElement('div'), /* modifier column */
			input
		);
		r.className+=' row-items';
		r.children[1].appendChild(itemNumber);
		return r;
	},

	addItem:function(){
		var i=0;
		while(document.getElementById('number-item'+i) || document.getElementById('select-item'+i)){
			i++;
		}
		if(i<this.Constants.MAX_ITEMS){
			this._writeItemName(i,'Item_Fruit_A');
			document.getElementById('container-materials').appendChild(this._createItemRow(i, false));
			this.editItem(i);
		}
	},

	editItem:function(i){
		currentEditingItem=i;
		document.getElementById('select-item').value=this._loadItemName(i);

		MarcDialogs.open('item');
	},
	editItem2:function(i,nameId){
		var oldCat=this._getItemCategory(this._loadItemName(i));
		var newCat=this._getItemCategory(nameId);

		if(oldCat!==newCat){
			var row=this._getItemRow(i);
			row.parentElement.removeChild(row);
			document.getElementById('container-'+newCat).appendChild(row);
		}
		this._writeItemName(i, nameId);
		document.getElementById('item-name'+i).innerHTML=this._getItemTranslation(nameId);
		BOTW_Icons.setIcon(document.getElementById('icon'+i), nameId);
		if(document.getElementById('number-item'+i))
			document.getElementById('number-item'+i).maxValue=this._getItemMaximumQuantity(nameId);
	},

	_getModifierOffset1:function(type){
		if(type==='bows')
			return this.Offsets.FLAGS_BOW;
		else if(type==='shields')
			return this.Offsets.FLAGS_SHIELDS;
		else
			return this.Offsets.FLAGS_WEAPON;
	},
	_getModifierOffset2:function(type){
		if(type==='bows')
			return this.Offsets.FLAGSV_BOW;
		else if(type==='shields')
			return this.Offsets.FLAGSV_SHIELD;
		else
			return this.Offsets.FLAGSV_WEAPON;
	},

	editModifier2:function(type,i,modifier,val){
		tempFile.writeInt(this._getModifierOffset1(type)+i*0x08, modifier);
		tempFile.writeInt(this._getModifierOffset2(type)+i*0x08, val);
	},

	editHorse:function(i){
		currentEditingItem=i;
		if(currentEditingItem==5){ /* untamed horse */
			hide('row-tamed-horse');
			if(!this._readString(this.Offsets.HORSE_TYPES+this.Constants.STRING_SIZE*5).startsWith('GameRomHorse')){
				MarcDialogs.alert('Error: this will only work if your savegame has Link on an untamed horse.');
				return false;
			}
		}else{
			show('row-tamed-horse');
			setValue('horse-name',this._readString(this.Offsets.HORSE_NAMES+this.Constants.STRING_SIZE*i));
			setValue('horse-saddles',this._readString(this.Offsets.HORSE_SADDLES+this.Constants.STRING_SIZE*i));
			setValue('horse-reins',this._readString(this.Offsets.HORSE_REINS+this.Constants.STRING_SIZE*i));
		}
		setValue('horse-type',this._readString(this.Offsets.HORSE_TYPES+this.Constants.STRING_SIZE*i));
		MarcDialogs.open('horse');
	},
	editHorse2:function(i,name,saddles,reins,type){
		if(currentEditingItem<5){
			this._writeString(this.Offsets.HORSE_NAMES+this.Constants.STRING_SIZE*i, getValue('horse-name'));
			this._writeString(this.Offsets.HORSE_SADDLES+this.Constants.STRING_SIZE*i, getValue('horse-saddles'));
			this._writeString(this.Offsets.HORSE_REINS+this.Constants.STRING_SIZE*i, getValue('horse-reins'));
		}
		this._writeString(this.Offsets.HORSE_TYPES+this.Constants.STRING_SIZE*i, getValue('horse-type'));

		if(getValue('horse-type')==='GameRomHorse00L'){
			this._writeString(this.Offsets.HORSE_MANES+this.Constants.STRING_SIZE*i, 'Horse_Link_Mane_00L');
		}
	},

	_arrayToSelectOpts:function(arr){
		var arr2=[];
		for(var i=0; i<arr.length; i++){
			var name=BOTW_Data.Translations[6].items[arr[i]] || arr[i];
			arr2.push({name:name, value:arr[i]});
		}
		return arr2;
	},


	/* check if savegame is valid */
	_checkValidSavegameByConsole:function(switchMode){
		var CONSOLE=switchMode?'Switch':'Wii U';
		tempFile.littleEndian=switchMode;
		for(var i=0; i<this.Constants.FILESIZE.length; i++){
			var versionHash=tempFile.readInt(0);
			if(versionHash===0x2a46) //v1.3.0 switch?
				versionHash=0x29c0;

			if(tempFile.fileSize===this.Constants.FILESIZE[i] && versionHash===this.Constants.HEADER[i] && tempFile.readInt(4)===0xffffffff){
				this._getOffsets(i);
				setValue('version', this.Constants.VERSION[i]+' ('+CONSOLE+')');
				return true;
			}
		}

		return false
	},
	checkValidSavegame:function(){
		return this._checkValidSavegameByConsole(false) || this._checkValidSavegameByConsole(true);
	},


	preload:function(){
		setNumericRange('rupees', 0, 999999);
		setNumericRange('mons', 0, 999999);
		setNumericRange('relic-gerudo', 0, 99);
		setNumericRange('relic-goron', 0, 99);
		setNumericRange('relic-rito', 0, 99);

		/* prepare edit item selector */
		for(var i=0; i<BOTW_Data.Translations.length; i++){
			var optGroup=document.createElement('optgroup');
			optGroup.label=BOTW_Data.Translations[i].id;

			for(var item in BOTW_Data.Translations[i].items){
				var opt=document.createElement('option');
				opt.value=item;
				opt.innerHTML=BOTW_Data.Translations[i].items[item];
				optGroup.appendChild(opt);
			}
			get('select-item').appendChild(optGroup);
		}

		/* map position selectors */
		select(
			'pos-maptype',
			[
				'?',
				{value:'MainField',name:'MainField'},
				{value:'MainFieldDungeon',name:'MainFieldDungeon'}
			],
			function(){
				if(this.value==='MainField'){
					setValue('pos-map','A-1');
				}else if(this.value==='MainFieldDungeon'){
					setValue('pos-map','RemainsElectric');
					fixDungeonCoordinates();
				}
			}
		);

		var maps=['?'];
		for(var i=0; i<10; i++){
			for(var j=0; j<8; j++){
				var map=(String.fromCharCode(65+i))+'-'+(j+1);
				maps.push({value:map,name:map});
			}
		}
		for(var i=0; i<120; i++){
			var map='Dungeon'
			if(i<100)
				map+='0';
			if(i<10)
				map+='0';
			map+=i;
			maps.push({value:map,name:map});
		}
		maps.push({value:'RemainsElectric',name:'RemainsElectric'});
		maps.push({value:'RemainsFire',name:'RemainsFire'});
		maps.push({value:'RemainsWater',name:'RemainsWater'});
		maps.push({value:'RemainsWind',name:'RemainsWind'});
		select('pos-map', maps, function(){
			if(/^.-\d$/.test(this.value)){
				setValue('pos-maptype','MainField');
			}else if(/^Remains/.test(this.value)){
				setValue('pos-maptype','MainFieldDungeon');
				fixDungeonCoordinates();
			}else if(/^Dungeon/.test(this.value)){
				setValue('pos-maptype','MainFieldDungeon');
			}
		});

		/* dialogs */
		select('horse-saddles', this._arrayToSelectOpts(BOTW_Data.HORSE_SADDLES));
		select('horse-reins', this._arrayToSelectOpts(BOTW_Data.HORSE_REINS));
		select('horse-type', this._arrayToSelectOpts(BOTW_Data.HORSE_TYPES));
	},

	_timeToString:function(timeVal){
		var seconds=timeVal%60;
		if(seconds<10)seconds='0'+seconds;
		var minutes=parseInt(timeVal/60)%60;
		if(minutes<10)seconds='0'+seconds;
		return parseInt(timeVal/3600)+':'+minutes+':'+seconds;
	},

	/* load function */
	load:function(){
		tempFile.fileName='game_data.sav';


		/* prepare editor */
		setValue('rupees', tempFile.readInt(this.Offsets.RUPEES));
		setValue('mons', tempFile.readInt(this.Offsets.MONS));

		setValue('relic-gerudo', tempFile.readInt(this.Offsets.RELIC_GERUDO));
		setValue('relic-goron', tempFile.readInt(this.Offsets.RELIC_GORON));
		setValue('relic-rito', tempFile.readInt(this.Offsets.RELIC_RITO));

		setValue('koroks', tempFile.readInt(this.Offsets.KOROK_SEED_COUNTER));
		setValue('defeated-hinox', tempFile.readInt(this.Offsets.DEFEATED_HINOX_COUNTER));
		setValue('defeated-talus', tempFile.readInt(this.Offsets.DEFEATED_TALUS_COUNTER));
		setValue('defeated-molduga', tempFile.readInt(this.Offsets.DEFEATED_MOLDUGA_COUNTER));
		setValue('playtime',this._timeToString(tempFile.readInt(this.Offsets.PLAYTIME)));


		/* motorcycle */
		document.getElementById('checkbox-motorcycle').checked=!!tempFile.readInt(this.Offsets.MOTORCYCLE);
		if(this.Offsets.MOTORCYCLE){
			document.getElementById('row-motorcycle').style.display='flex';
		}else{
			document.getElementById('row-motorcycle').style.display='none';
		}


		/* coordinates */
		setValue('pos-x', tempFile.readFloat32(this.Offsets.PLAYER_POSITION));
		setValue('pos-y', tempFile.readFloat32(this.Offsets.PLAYER_POSITION+8));
		setValue('pos-z', tempFile.readFloat32(this.Offsets.PLAYER_POSITION+16));

		var map=this._readString(this.Offsets.MAP);
		var mapType=this._readString(this.Offsets.MAPTYPE);
		getField('pos-map').children[0].value=map;
		getField('pos-map').children[0].innerHTML='* '+map+' *';
		getField('pos-maptype').children[0].value=mapType;
		getField('pos-maptype').children[0].innerHTML='* '+mapType+' *';
		setValue('pos-map',map)
		setValue('pos-maptype',mapType)

		setValue('pos-x-horse', tempFile.readFloat32(this.Offsets.HORSE_POSITION));
		setValue('pos-y-horse', tempFile.readFloat32(this.Offsets.HORSE_POSITION+8));
		setValue('pos-z-horse', tempFile.readFloat32(this.Offsets.HORSE_POSITION+16));


		/* map pins */
		loadMapPins()


		/* items */
		empty('container-weapons');
		empty('container-bows');
		empty('container-shields');
		empty('container-clothes');
		empty('container-materials');
		empty('container-food');
		empty('container-other');

		var modifiersArray=[0,0,0];
		var search=0; //0:weapons, 1:bows, 2:shields
		for(var i=0; i<this.Constants.MAX_ITEMS; i++){
			var itemNameId=this._loadItemName(i);
			if(itemNameId==='')
				break;

			var itemCat=this._getItemCategory(itemNameId);
			document.getElementById('container-'+itemCat).appendChild(
				this._createItemRow(i, itemCat)
			);

			if(search===0 && itemCat==='bows'){
				search=1;
			}else if(search===0 && itemCat==='shields'){
				search=2;
			}else if(search===1 && itemCat==='shields'){
				search=2;
			}else if(itemCat!=='weapons' && itemCat!=='bows' && itemCat!=='shields'){
				search=3;
			}

			if(itemCat==='weapons' && search===0){
				modifiersArray[0]++;
			}else if(itemCat==='bows' && search===1 && itemNameId.startsWith('Weapon_')){
				modifiersArray[1]++;
			}else if(itemCat==='shields' && search===2){
				modifiersArray[2]++;
			}

		}
		MarcTooltips.add(document.querySelectorAll('#container-weapons input'),'Weapon durability',{position:'bottom',align:'right'});
		MarcTooltips.add(document.querySelectorAll('#container-bows input'),'Bow durability',{position:'bottom',align:'right'});
		MarcTooltips.add(document.querySelectorAll('#container-shields input'),'Shield durability',{position:'bottom',align:'right'});
		BOTW_Icons.startLoadingIcons();

		/* modifier column */
		var modifierColumns=['weapon','bow','shield'];
		for(var j=0; j<3; j++){
			var modifierColumn=modifierColumns[j];
			for(var i=0; i<modifiersArray[j]; i++){
				var modifier=tempFile.readInt(this.Offsets['FLAGS_'+modifierColumn.toUpperCase()]+i*8);
				var modifierSelect=select('modifier-'+modifierColumn+'s-'+i, BOTW_Data.MODIFIERS.concat({value:modifier,name:this._toHexInt(modifier)}));
				modifierSelect.value=modifier;

				var additional=document.getElementById('container-'+modifierColumn+'s').children[i].children[2];
				additional.appendChild(modifierSelect);
				additional.appendChild(inputNumber('modifier-'+modifierColumn+'s-value-'+i, 0, 0xffffffff, tempFile.readInt(this.Offsets['FLAGSV_'+modifierColumn.toUpperCase()]+i*8)));
			}
		}
	},

	/* save function */
	save:function(){
		/* STATS */
		tempFile.writeInt(this.Offsets.RUPEES, getValue('rupees'));
		tempFile.writeInt(this.Offsets.MONS, getValue('mons'));

		tempFile.writeInt(this.Offsets.RELIC_GERUDO, getValue('relic-gerudo'));
		tempFile.writeInt(this.Offsets.RELIC_GORON, getValue('relic-goron'));
		tempFile.writeInt(this.Offsets.RELIC_RITO, getValue('relic-rito'));
		
		tempFile.writeInt(this.Offsets.KOROK_SEED_COUNTER, getValue('koroks'));
		tempFile.writeInt(this.Offsets.DEFEATED_HINOX_COUNTER, getValue('defeated-hinox'));
		tempFile.writeInt(this.Offsets.DEFEATED_TALUS_COUNTER, getValue('defeated-talus'));
		tempFile.writeInt(this.Offsets.DEFEATED_MOLDUGA_COUNTER, getValue('defeated-molduga'));
		

		/* MOTORCYCLE */
		if(this.Offsets.MOTORCYCLE){
			tempFile.writeInt(this.Offsets.MOTORCYCLE, getField('checkbox-motorcycle').checked?1:0);
		}



		/* COORDINATES */
		tempFile.writeFloat32(this.Offsets.PLAYER_POSITION, getValue('pos-x'));
		tempFile.writeFloat32(this.Offsets.PLAYER_POSITION+8, getValue('pos-y'));
		tempFile.writeFloat32(this.Offsets.PLAYER_POSITION+16, getValue('pos-z'));
		
		this._writeStringShort(this.Offsets.MAP, getValue('pos-map'))
		this._writeStringShort(this.Offsets.MAPTYPE, getValue('pos-maptype'))

		tempFile.writeFloat32(this.Offsets.HORSE_POSITION, getValue('pos-x-horse'));
		tempFile.writeFloat32(this.Offsets.HORSE_POSITION+8, getValue('pos-y-horse'));
		tempFile.writeFloat32(this.Offsets.HORSE_POSITION+16, getValue('pos-z-horse'));


		/* ITEMS */
		for(var i=0; i<this.Constants.MAX_ITEMS; i++){
			if(document.getElementById('number-item'+i) || document.getElementById('select-item'+i))
				tempFile.writeInt(this._getItemQuantityOffset(i), getValue('item'+i));
			else
				break;
		}

		/* modifiers */
		for(var i=0; document.getElementById('select-modifier-weapons-'+i); i++){
			tempFile.writeInt(this.Offsets.FLAGS_WEAPON+i*8, getValue('modifier-weapons-'+i));
			tempFile.writeInt(this.Offsets.FLAGSV_WEAPON+i*8, getValue('modifier-weapons-value-'+i));
		}
		for(var i=0; document.getElementById('select-modifier-bows-'+i); i++){
			tempFile.writeInt(this.Offsets.FLAGS_BOW+i*8, getValue('modifier-bows-'+i));
			tempFile.writeInt(this.Offsets.FLAGSV_BOW+i*8, getValue('modifier-bows-value-'+i));
		}
		for(var i=0; document.getElementById('select-modifier-shields-'+i); i++){
			tempFile.writeInt(this.Offsets.FLAGS_SHIELD+i*8, getValue('modifier-shields-'+i));
			tempFile.writeInt(this.Offsets.FLAGSV_SHIELD+i*8, getValue('modifier-shields-value-'+i));
		}
	}
}

/*
function setValueByHash(hash, val){
	var offset=SavegameEditor._searchHash(hash);
	if(offset){
		if(val.length && val.length===3){
			SavegameEditor._writeValue(offset, val[0]);
			SavegameEditor._writeValue(offset, val[1], 1);
			SavegameEditor._writeValue(offset, val[2], 2);
		}else if(typeof val==='string'){
			SavegameEditor._writeString(offset, val);
		}else{
			SavegameEditor._writeValue(offset, val);
		}
	}else{
		alert('invalid hash '+SavegameEditor._toHexInt(hash));
	}
}*/

function setBooleans(hashTable, counterElement){
	var counter=0;
	for(var i=0;i<hashTable.length; i++){
		var offset=SavegameEditor._searchHash(hashTable[i]);
		if(offset && !tempFile.readInt(offset+4)){
			tempFile.writeInt(offset+4, 1);
			counter++;
		}
	}

	if(counterElement)
		setValue(counterElement, parseInt(getValue(counterElement))+counter);
	return counter;
}

function unlockKoroks(){
	var unlockedKoroks=setBooleans(BOTW_Data.KOROKS,'koroks');
	var offset=SavegameEditor._searchHash(0x64622a86); //HiddenKorok_Complete
	tempFile.writeInt(offset+4, 1);

	//search korok seeds in inventory
	for(var i=0; i<SavegameEditor.Constants.MAX_ITEMS; i++){
		if(SavegameEditor._loadItemName(i)==='Obj_KorokNuts'){
			setValue('item'+i, parseInt(getValue('item'+i))+unlockedKoroks);
			break;
		}
	}
	MarcDialogs.alert(unlockedKoroks+' korok seeds were added');
}

function defeatAllHinox(){
	var unlockedKoroks=setBooleans(BOTW_Data.DEFEATED_HINOX,'defeated-hinox');
	MarcDialogs.alert(unlockedKoroks+' Hinox have been defeated');
}
function defeatAllTalus(){
	var unlockedKoroks=setBooleans(BOTW_Data.DEFEATED_TALUS,'defeated-talus');
	MarcDialogs.alert(unlockedKoroks+' Talus have been defeated');
}
function defeatAllMolduga(){
	var unlockedKoroks=setBooleans(BOTW_Data.DEFEATED_MOLDUGA,'defeated-molduga');
	MarcDialogs.alert(unlockedKoroks+' Molduga have been defeated');
}
function visitAllLocations(){
	var missingLocations=setBooleans(BOTW_Data.LOCATIONS);
	MarcDialogs.alert(missingLocations+' unknown locations were visited');
}
function setCompendiumToStock(){
	var setToStock=0;
	for(var i=0; i<BOTW_Data.PICTURE_BOOK_SIZE.length; i++){
		var offset=SavegameEditor._searchHash(BOTW_Data.PICTURE_BOOK_SIZE[i]);
		if(typeof offset === 'number'){
			var val=tempFile.readInt(offset+4);
			if(val && val!==0xffffffff){
				tempFile.writeInt(offset+4, 0xffffffff);
				setToStock++;
			}
		}
	}
	MarcDialogs.alert(setToStock+' pics were reseted to stock.<br/>You can now safely remove all .jpg files under <u>pict_book</u> folder.');
}

var mapPinCount = 0;
var MAX_MAP_PINS = 100;
function loadMapPins(){
	// Read Pin Types
	var count = 0;
	iterateMapPins(function(val){
		if (val == 0xffffffff){
			return false;
		}
		count++;
		//console.log(count, val)
		return true;
	})
	// to debug saved locations
	// var i = 0;
	// iterateMapPinLocations(function(val, offset){
	// 	if (i % 3 == 0){
	// 		console.log("-----")
	// 		if (val == -100000){
	// 			return false;
	// 		}
	// 	}
	// 	i++
	// 	console.log(val)
	// 	return true
	// })
	mapPinCount = count;
	setValue('number-map-pins', count);
}

function guessMainFieldGrid() {
	if (getValue('pos-maptype') == "MainField")
		setValue("pos-map",guessMainFieldGridInternal(getValue("pos-x"), getValue("pos-z")))
}

function fixDungeonCoordinates() {
	var dungeon = getValue('pos-map')
	if (dungeon == "RemainsFire") {
		setValue('pos-x', 0)
		setValue('pos-y',16.8)
		setValue('pos-z',69.5)
	} else if (dungeon == "RemainsWater") {
		setValue('pos-x',47.7)
		setValue('pos-y',6.05)
		setValue('pos-z',6.3)
	} else if (dungeon == "RemainsWind") {
		setValue('pos-x',0)
		setValue('pos-y',3.4)
		setValue('pos-z',-77.7)
	} else if (dungeon == "RemainsElectric") {
		setValue('pos-x',0)
		setValue('pos-y',71.9)
		setValue('pos-z',3.7)
	} else if (dungeon == "FinalTrial") {
		setValue('pos-x',0)
		setValue('pos-y',-0.4)
		setValue('pos-z',64.5)
	}
}

function guessMainFieldGridInternal(xpos, zpos) {
	// A1 = -4974.629, -3974.629
	// J8 =  4974.629,  3974.629
	// X and letter part of grid: west/east
	// Z and number part of grid: north/south

	// grid also visible at https://mrcheeze.github.io/botw-object-map/

	// idea: Take position fraction out of the whole grid and divide equally.

	var gridvalX = Math.min(10, Math.max(1, Math.trunc((xpos + 4974.629) / 9949.258 * 10 + 1)))
	var gridvalZ = Math.min( 8, Math.max(1, Math.trunc((zpos + 3974.629) / 7949.258 * 8  + 1)))

	return String.fromCharCode(64 + gridvalX) + '-' + gridvalZ
}

function clearMapPins(){
	// types
	var count = 0;
	iterateMapPins(function(val,offset){
		if (val != 0xffffffff){
			count++;
			tempFile.writeInt(offset, 0xffffffff)
		}
		return true;
	})

	var count2 =0; 
	var i = 0;
	iterateMapPinLocations(function(val, offset){
		var expect = i % 3 == 0 ? -100000 : 0;
		i++;
		if (val != expect){
			count2++
			tempFile.writeFloat32(offset, expect)
		}
		return true
	})
	if (count2 / 3 > count){
		count = count2 / 3
	}
	mapPinCount = 0;
	setValue('number-map-pins', 0);
	MarcDialogs.alert(count+' map pins removed');
}

function iterateMapPins(f){
	var offset = SavegameEditor._searchHash(SavegameEditor.Constants.MAP_ICONS)
	for (var i = 0;; i++){
		var base = offset + (8 * i)
		var hdr = tempFile.readInt(base)
		var val = tempFile.readInt(base + 4)
		if (hdr != SavegameEditor.Constants.MAP_ICONS){
			break
		}
		if (!f(val,base+4)){
			break
		}
	}
}
function iterateMapPinLocations(f){
	offset = SavegameEditor._searchHash(SavegameEditor.Constants.MAP_POS)
	for (var i = 0;; i++){
		var base = offset + (8 * i)
		var hdr = tempFile.readInt(base)
		var val = tempFile.readFloat32(base + 4)
		if (hdr != SavegameEditor.Constants.MAP_POS){
			break
		}
		if(!f(val,base+4)){
			break
		}
	}
}

function dist(px,py,pz,l){
	// 2d seems to work better than 3d
	return Math.sqrt((Math.pow(l[0]-px,2))+(Math.pow(l[2]-pz,2)))
}



function addToMap(data, icon){
	var px=tempFile.readFloat32(SavegameEditor.Offsets.PLAYER_POSITION);
	var py=tempFile.readFloat32(SavegameEditor.Offsets.PLAYER_POSITION+8);
	var pz=tempFile.readFloat32(SavegameEditor.Offsets.PLAYER_POSITION+16);

	var points = [];
	for (var i = 0; i<data.length; i++){
		var l = BOTW_Data.COORDS[data[i]]
		if (l){
		   points.push({H:data[i], L:l})
		}
	}
	// fill closest first
	points.sort(function(a,b){
		aDist = dist(px,py,pz,a.L);
		bDist = dist(px,py,pz,b.L);
		return aDist - bDist
	})
	var count = 0;
	for (var i = 0; i<points.length && mapPinCount<MAX_MAP_PINS; i++){
		var pt = points[i]
		var hash = pt.H;
		var offset=SavegameEditor._searchHash(hash);
		if(offset && !tempFile.readInt(offset + 4)){
			addMapPin(icon, pt.L)
			count++;
			mapPinCount++;
		}
	}
	setValue('number-map-pins', mapPinCount);
	return count;
}

function addMapPin(icon, location){
	// add pin to next availible location.
	iterateMapPins(function(val,offset){
		if (val == 0xffffffff){
			tempFile.writeInt(offset, icon)
			return false
		}
		return true;
	})
	var i = 0;
	var added = false;
	iterateMapPinLocations(function(val, offset){
		if (i%3 != 0){
			i++
			return true;
		}
		i++
		if (val == -100000){
			added = true;
			tempFile.writeFloat32(offset,location[0])
			tempFile.writeFloat32(offset+8,location[1])
			tempFile.writeFloat32(offset+16,location[2])
			return false;
		}
		return true;
	})
}

function addKoroksToMap(){
	var n = addToMap(BOTW_Data.KOROKS, SavegameEditor.Constants.ICON_TYPES.LEAF);
	MarcDialogs.alert(n+' pins for missing Korok seeds added to map');
}

function addHinoxToMap(){
	var n = addToMap(BOTW_Data.DEFEATED_HINOX, SavegameEditor.Constants.ICON_TYPES.SKULL);
	MarcDialogs.alert(n+' pins for missing Hinox added to map');
}

function addTalusToMap(){
	var n = addToMap(BOTW_Data.DEFEATED_TALUS, SavegameEditor.Constants.ICON_TYPES.SHIELD);
	MarcDialogs.alert(n+' pins for missing Talus added to map');
}

function addMoldugaToMap(){
	var n = addToMap(BOTW_Data.DEFEATED_MOLDUGA, SavegameEditor.Constants.ICON_TYPES.CHEST);
	MarcDialogs.alert(n+' pins for missing Molduga added to map');
}

function addLocationsToMap(){
	var n = addToMap(BOTW_Data.LOCATIONS, SavegameEditor.Constants.ICON_TYPES.STAR);
	MarcDialogs.alert(n+' pins for missing locations added to map');
}


/* MarcTooltips.js v20170518 - Marc Robledo 2014-2017 - http://www.marcrobledo.com/license */
var MarcTooltips=function(){return{add:function(a,b,c){var d=document.createElement("div");d.className="tooltip",d.style.position="absolute",d.style.zIndex="9000",d.style.top="0",d.style.left="0",d.innerHTML=b,document.body.appendChild(d);var e="down",f="center";c&&c.position&&/^(up|down|left|right)$/i.test(c.position)&&(e=c.position.toLowerCase()),c&&c.align&&/^(top|bottom|left|right)$/i.test(c.align)&&(("up"!==e&&"down"!==e||"left"!==c.align&&"right"!==c.align)&&("left"!==e&&"right"!==e||"top"!==c.align&&"bottom"!==c.align)||(f=c.align.toLowerCase()));var h=document.createElement("div");h.className="arrow",d.className+=" position-"+e+" align-"+f,d.className+="left"===e||"right"===e?" position-horizontal":" position-vertical",d.appendChild(h);var i=function(){var a=document.documentElement,b=(window.pageXOffset||a.scrollLeft)-(a.clientLeft||0),c=(window.pageYOffset||a.scrollTop)-(a.clientTop||0),g=this.getBoundingClientRect(),h=d.getBoundingClientRect();d.style.top="up"===e?parseInt(g.top+c-h.height)+"px":"down"===e?parseInt(g.top+c+g.height)+"px":"top"===f?parseInt(g.top+c)+"px":"bottom"===f?parseInt(g.top+c-(h.height-g.height))+"px":parseInt(g.top+c-parseInt((h.height-g.height)/2))+"px",d.style.left="up"===e||"down"===e?"left"===f?parseInt(g.left+b)+"px":"right"===f?parseInt(g.left+b-(h.width-g.width))+"px":parseInt(g.left+b-parseInt((h.width-g.width)/2))+"px":"left"===e?parseInt(g.left+b-h.width)+"px":parseInt(g.left+b+g.width)+"px",d.className+=" visible"},j=function(){d.className=d.className.replace(" visible","")};"string"==typeof a&&(a=[a]);for(var k=0;k<a.length;k++)if("string"==typeof a[k])if(/^#[0-9a-zA-Z_\-]+$/.test(a[k])){var l=document.getElementById(a[k].replace("#",""));l.addEventListener("mouseover",i,!1),l.addEventListener("mouseout",j,!1)}else for(var m=document.querySelectorAll(a[k]),n=0;n<m.length;n++)m[n].addEventListener("mouseover",i,!1),m[n].addEventListener("mouseout",j,!1);else a[k].addEventListener("mouseover",i,!1),a[k].addEventListener("mouseout",j,!1)}}}();


function onScroll(){
	var h=document.getElementById('header-top').getBoundingClientRect().height;
	if(window.scrollY>h){
		document.getElementById('header').style.position='fixed';
		document.getElementById('header').style.top='-'+h+'px';
	}else{
		document.getElementById('header').style.position='absolute';
		document.getElementById('header').style.top='0px';
	}
}

window.addEventListener('load',function(){
	/* service worker */
	if(location.protocol==='http:')
		location.href=window.location.href.replace('http:','https:');
	if('serviceWorker' in navigator)
		navigator.serviceWorker.register('_cache_service_worker.js');

	window.addEventListener('scroll',onScroll,false);
}, false);