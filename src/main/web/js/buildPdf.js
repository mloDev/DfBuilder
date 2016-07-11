function buildPdf(value) {
    var pdfContent = value;
    var dd = {
            content: [
                    header(pdfContent),
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
				dataRow.push(row[column].toString());
			})
		body.push(dataRow);
	});
	
	return body;
}

function header(data) {
	return                     {
		table: {
			widths: [50,'*', 200],
			body: [
					[ pdfContent.faction, pdfContent.name, { text: 'Battle', style: 'points' }],
					[ '', '', pdfContent.totalPoints]
			]
		},
		layout: 'noBorders'
	}
	
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
