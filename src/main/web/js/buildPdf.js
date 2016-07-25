function buildPdf(value, ships, armyList, printShipDetails, modelList, shoppingList, modelShips) {
    var pdfContent = value;
    var printShips = ships;
    var dd = {
    		footer: 
                function(currentPage, pageCount) { return [
                   {
                       margin: [60, 0, 60, 0],
                       canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*60, y2: 5, lineWidth: 1 }]},
                   {
                    margin: [60, 0, 60, 0],
                    table: {
                        widths: [100,'*', 100],
                        body: [
                            [ 'DfBuilder Beta0.1', '', { text: 'Page ' + currentPage.toString() + ' of ' + pageCount, style: 'pts' }]
                        ]
        			},
        			layout: 'noBorders'
        			}];
        		},
            content: [
                    createHeader(pdfContent, armyList),
                    addCanvas(armyList, armyList),
                    table(pdfContent.lineBattlegroupes, ['name', 'pts'], armyList),
                    table(pdfContent.pathfinderBattlegroupes, ['name', 'pts'], armyList),
                    table(pdfContent.vanguardBattlegroupes, ['name', 'pts'], armyList),
                    table(pdfContent.flagBattlegroupes, ['name', 'pts'], armyList),
                    addPageBreak(armyList),
                    //stats of fleet ships
                    createHeaderShipDetails(pdfContent, printShipDetails),
                    addCanvas(printShipDetails),
                    shipDetails(printShips, printShipDetails),
                    addPageBreak(printShipDetails),
                    //add model list if modelList
                    createHeaderModelList(pdfContent, modelList),
                    addCanvas(modelList),
                    addModelShips(modelList, modelShips),
                    addPageBreak(modelList),
                    //add shopping list if shoppinList
                    createHeaderShipDetails(pdfContent, shoppingList),
                    addCanvas(shoppingList)
            ],
        	styles: {
        		tableDetails: {
        			fontSize: 6,
        			bold: false
        		},
        		header: {
        			fontSize: 13,
        			bold: true
        		},
        		headerRight: {
        			fontSize: 13,
        			bold: true,
        			alignment: 'right'
        		},
        		subheader: {
        			fontSize: 10,
        			bold: true
        		},
        		hrcanvas: {
        			color: '#26bdbf',
        			background: '#26bdbf'
        		},
        		ship: {
        			fontSize: 10,
        			bold: false
        		},
        		subheaderPts: {
        			fontSize: 10,
        			bold: true,
        			alignment: 'right'
        		},
        		quote: {
        			italics: true
        		},
        		headerPts: {
        			alignment: 'right',
        			fontSize: 13
        		},
        		pts: {
        			alignment: 'right'
        		}
        	},
        	pageMargins: [ 60, 40, 60, 40 ],
	     	defaultStyle: {
	     		fontSize: 10,
	     	}
        }
    return dd;
}

function buildTableWeapons(data) {
	var body = [];
	var tmp = [];
	tmp.push({text: 'TYPE'});
	tmp.push({text: 'LOCK'});
	tmp.push({text: 'ATTACK'});
	tmp.push({text: 'DAMAGE'});
	tmp.push({text: 'ARC'});
	tmp.push({text: 'SPECIAL'});
	body.push(tmp);
	data.forEach(function(weapon){
		var specialString = '';
		weapon.specials.forEach(function(special) {
			if (weapon.specials.length == 1) {
				specialString = special.name;
			} else {
				specialString = special.name + ", " + specialString;
			}
		});
		tmp = [];
		tmp.push({text: weapon.name});
		tmp.push({text: weapon.lock.toString() + "+"});
		tmp.push({text: weapon.attack});
		tmp.push({text: weapon.damage.toString()});
		tmp.push({text: weapon.arc});
		tmp.push({text: specialString});

		body.push(tmp);
	});
	return body;
}

function buildTableLoads(data) {
	var body = [];
	var tmp = [];
	tmp.push({text: 'LOAD'});
	tmp.push({text: 'LAUNCH'});
	tmp.push({text: 'SPECIAL'});
	body.push(tmp);
	data.forEach(function(load){
		tmp = [];
		var specialString = '';
		load.specials.forEach(function(special) {
			if (load.specials.length == 1) {
				specialString = special.name;
			} else {
				specialString = special.name + ", " + specialString;
			}
		});
		console.log(load);
		tmp.push({text: load.name});
		tmp.push({text: load.launch.toString()});
		tmp.push({text: specialString});
		body.push(tmp);
	});
	return body;
}

function buildTableBody(data, columns) {
	var body = [];    
	data.lightShips.forEach(function(row) {
			var dataRow = [];
			columns.forEach(function(column) {
				if (column == 'pts') {
					dataRow.push({text: row[column].toString() + ' pts', style: 'pts' });
				} else {
					dataRow.push({ style: 'subheader', text: [row.shipType +  ": ", { text: row.gcurrent + "x " + row[column].toString(), style: 'ship'}]});
				}
				
			})
		body.push(dataRow);
	});
	data.mediumShips.forEach(function(row) {
		var dataRow = [];
		columns.forEach(function(column) {
			if (column == 'pts') {
				dataRow.push({text: row[column].toString() + ' pts', style: 'pts' });
			} else {
				dataRow.push({ style: 'subheader', text: [row.shipType +  ": ", { text: row.gcurrent + "x " + row[column].toString(), style: 'ship'}]});
			}
			
		})
		body.push(dataRow);
	});
	data.heavyShips.forEach(function(row) {
		var dataRow = [];
		columns.forEach(function(column) {
			if (column == 'pts') {
				dataRow.push({text: row[column].toString() + ' pts', style: 'pts' });
			} else {
				dataRow.push({ style: 'subheader', text: [row.shipType +  ": ", { text: row.gcurrent + "x " + row[column].toString(), style: 'ship'}]});
			}
			
		})
		body.push(dataRow);
	});
	data.superHeavyShips.forEach(function(row) {
		var dataRow = [];
		columns.forEach(function(column) {
			if (column == 'pts') {
				dataRow.push({text: row[column].toString() + ' pts', style: 'pts' });
			} else {
				dataRow.push({ style: 'subheader', text: [row.shipType +  ": ", { text: row.gcurrent + "x " + row[column].toString(), style: 'ship'}]});
			}
			
		})
		body.push(dataRow);
	});
	return body;
}

function createHeader(data, value) {
	var header = {
			table: {
				widths: [50,'*', 200],
				body: [
						[ { text: data.faction, style: 'header'}, { text: data.name, style: 'header'}, { text: data.gameSize.name, style: 'headerRight' } ],
						[ '', '', { text: data.totalPoints + '/' + data.maxPoints + ' PTS', style: 'headerPts' } ]
				]
			},
			layout: 'noBorders'
		};
	if(value) {
		return header;
	} else {
		return [];
	}
	
}

function createHeaderShipDetails(data, value) {
	var returnHeader = {
			table: {
				widths: [50, '*', 200],
				body: [
						[ { text: data.faction, style: 'header'}, { text: data.name, style: 'header'}, { text: "REFERENCE SHEET", style: 'headerRight' } ]
				]
			},
			layout: 'noBorders'
		};
	if (value) {
		return returnHeader;
	} else {
		return [];
	}
}

function createHeaderModelList(data, value) {
	var returnHeader = {
			table: {
				widths: [50, '*', 200],
				body: [
						[ { text: data.faction, style: 'header'}, { text: data.name, style: 'header'}, { text: "MODEL LIST", style: 'headerRight' } ]
				]
			},
			layout: 'noBorders'
		};
	if (value) {
		return returnHeader;
	} else {
		return [];
	}
}

function addCanvas(value) {
	var canvas = {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*60, y2: 5, lineWidth: 1, style: 'hrcanvas' }]};
	if (value) {
		return canvas;
	} else {
		return [];
	}
}

function addPageBreak(value) {
	var pageBreak = { text: '', pageBreak: 'after'};
	if (value) {
		return pageBreak;
	} else {
		return [];
	}
}

function addModelShips(modelList, modelShips) {
	var a = [];
	if (modelList) {
		modelShips.forEach(function(ship) {
			var b = {text: ship.count + "x " + ship.name, margin: [0, 10, 0, 0]}
			a.push(b);
		});
	}
	return a;
}

function shipDetails(data, value){
	var a = [];
	var load = [];
	var weapon = [];
	var shipSpecial;
	var weaponSpecial;
	var loadSpecial;
	if (value) {
		data.forEach(function(ship) {
			shipSpecial = '';
			ship.specials.forEach(function(special) {
				if (ship.specials.length == 1) {
					shipSpecial = special.name;
				} else {
					shipSpecial = special.name + ", " + shipSpecial;
				}
			});
			console.log(shipSpecial);
			console.log(ship);
			var b = {
					style: 'tableDetails',
					margin: [0,10,0,0],
					table: {
						body: [
								[
										{ text: 'shipimage'
										},
										[
											{
												style: 'tableDetails',
												table: {
														widths: [100,'auto','auto','auto','auto','auto','auto','auto','auto', 'auto'],
														margin: [0,00,0,0],
	    												body: [
	    													[ 'NAME', 'SCAN', 'SIG', 'THRUST', 'HULL', 'A', 'PD', 'G', 'T', 'SPECIAL'],
	    													[ ship.name, ship.scan.toString(), ship.sig, ship.thrust.toString() + "\"", ship.hull.toString(), ship.a + "+", ship.pd.toString(), ship.gmin.toString() + "-" + ship.gmax.toString(), ship.t, shipSpecial]
	    												]
												},
											},
											weaponTable(ship),
											loadTable(ship)
										]
								]
						]
					},
					layout: 'noBorders'};
			a.push(b);
		});
	}
	return a;
}

function weaponTable(ship) {
	var a = [];
	if (ship.weapons.length > 0) {
		var b =
			{
				style: 'tableDetails',
				table: {
						margin: [0,0,0,0],
						widths: [100,'auto','auto','auto', 'auto', 'auto'],
						body: buildTableWeapons(ship.weapons)
					},
			}
		a.push(b);
	}
	return a;
}

function loadTable(ship) {
	var a = [];
	if (ship.loads.length > 0) {
		var b =
			{
				style: 'tableDetails',
				table: {
						margin: [0,0,0,0],
						widths: [100,'auto', 'auto'],
						body: buildTableLoads(ship.loads)
					},
			}
		a.push(b);
	}
	return a;
}

function table(data, columns, value) {
	var a = [];
	var battleType;
	if(value) {
		data.forEach(function(entry) {
			if (entry.battleGroupeType.battleType === 'LINE') {
				battleType = {
						color: '#697641',
						text: 'Linegroup', 
						style: 'subheader' };
			} else if (entry.battleGroupeType.battleType == 'VANGUARD') {
				battleType = {
						color: '#98741F',
						text: 'Vanguardgroup', 
						style: 'subheader' };	
			} else if (entry.battleGroupeType.battleType == 'PATHFINDER') {
				battleType = {
						color: '#915591',
						text: 'Pathfindergroup', 
						style: 'subheader' };
			} else if (entry.battleGroupeType.battleType == 'FLAG') {
				battleType = {
						color: '#436BA3',
						text: 'Flaggroup', 
						style: 'subheader' };	
			}
			var c = {
					margin: [0, 5, 0, 0],
					table: {
						widths: [150,'*', 150],
						body: [
								[ battleType, '', {text: entry.points + ' pts', style: 'subheaderPts' }]
						]
					},
					layout: 'noBorders'
				};
			a.push(c);
			var b = {
				margin: [10, 0, 0, 0],
				table: {
					widths: ['*', 100],
					body: buildTableBody(entry, columns)
				},
				layout: 'noBorders'};
			a.push(b);
		});
	}
	return a;
}
