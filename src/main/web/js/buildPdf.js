function buildPdf(value) {
    var pdfContent = value;
    var dd = {
            content: [
                    createHeader(pdfContent),
                    hrLine(),
                    table(pdfContent.lineBattlegroupes, ['name', 'pts']),
                    table(pdfContent.pathfinderBattlegroupes, ['name', 'pts']),
                    table(pdfContent.vanguardBattlegroupes, ['name', 'pts']),
                    table(pdfContent.flagBattlegroupes, ['name', 'pts'])
            ],
        	styles: {
        		header: {
        			fontSize: 15,
        			bold: true
        		},
        		subheader: {
        			fontSize: 15,
        			bold: true
        		},
        		quote: {
        			italics: true
        		},
        		points: {
        			alignment: 'right',
        			bold: true
        		}
        	},
	     	defaultStyle: {
	     		fontSize: 12,
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
					dataRow.push(row[column].toString() + 'pts');
				} else {
					dataRow.push(row[column].toString());
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
					[ data.faction, data.name, { text: 'Battle', style: 'points' }],
					[ '', '', { text: data.totalPoints + '/' + data.maxPoints + ' PTS', style: 'points' }]
			]
		},
		layout: 'noBorders'
	};
}

function hrLine() {
	return {
	    table: {
	            widths: ['*'],
	            body: ['']
	    },
	    layout: {
	        hLineWidth: function(i, node) {
	            return (i === 0 || i === node.table.body.length) ? 0 : 2;
	        },
	        vLineWidth: function(i, node) {
	            return 0;
	        },
	    }
	};
}

function table(data, columns) {
	var a = [];
	data.forEach(function(entry) {
		var c = { text: entry.battleGroupeType.battleType, style: 'header' };
		a.push(c);
		var b = {
			table: { 
				headerRows: 1,
				widths: ['*', 100],
				body: buildTableBody(entry, columns)
			},
			layout: 'noBorders'};
		a.push(b);
	})
	return a;
}
