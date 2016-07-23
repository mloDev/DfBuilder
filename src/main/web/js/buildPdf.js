function buildPdf(value, ships, printShipDetails) {
    var pdfContent = value;
    var printShips = ships;
    console.log(printShips);
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
                    createHeader(pdfContent),
                    {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*60, y2: 5, lineWidth: 1, style: 'hrcanvas' }]},
                    table(pdfContent.lineBattlegroupes, ['name', 'pts']),
                    table(pdfContent.pathfinderBattlegroupes, ['name', 'pts']),
                    table(pdfContent.vanguardBattlegroupes, ['name', 'pts']),
                    table(pdfContent.flagBattlegroupes, ['name', 'pts']),
                    createHeaderShipDetails(),
                    shipDetails(printShips, printShipDetails)
            ],
        	styles: {
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
    console.log(dd);
    return dd;
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

function createHeader(data) {
	return                     {
		table: {
			widths: [50,'*', 200],
			body: [
					[ { text: data.faction, style: 'header'}, { text: data.name, style: 'header'}, { text: data.gameSize.name, style: 'headerRight' }],
					[ '', '', { text: data.totalPoints + '/' + data.maxPoints + ' PTS', style: 'headerPts' }]
			]
		},
		layout: 'noBorders'
	};
}

function createHeaderShipDetails() {
	return {
		 text: 'Ship details', style: 'header', pageBreak:'before'
	};
}

function shipDetails(data, value){
	var a = [];
	console.log(data);
	if (value) {
		for (var ship in data) {
			var b = {
					margin: [0, 2, 0, 0],
					table: {
						body: [
								[
										{ text: 'shipimage'
										},
										[
											{
												table: {
	    												body: [
	    													[ 'Name', 'Scan', 'Sig', 'Thrust', 'A', 'PD', 'G', 'T', 'Special'],
	    													[ ship.name, '2', '3', '1', '2', '3', '1', '2', '3']
	    												]
												},
											},
											{
												table: {
	    												body: [
	    													[ 'Type', 'Lock', 'Attack', 'Damage', 'Special'],
	    													[ '1', '2', '3', '4', '5']
	    												]
	    											},
											},
											{
												table: {
	    												body: [
	    													[ 'Load', 'Launch', 'Special'],
	    													[ '1', '2', '3']
	    												]
	    											},
											}
										]
								]
						]
					},
					layout: 'noBorders'};
			a.push(b);
		};
		return a;
	}
}


function table(data, columns) {
	var a = [];
	var battleType;
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
	})
	return a;
}
