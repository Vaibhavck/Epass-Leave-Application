const options = { 
    format: 'A4',
    base: 'file://' + __dirname + '/assets/',
    header: {
		height: '0mm'
	},
};
const htmlTemplate = (hodSign) => `<div style="padding: 100px;">
<h1 style="text-align: center;">LEAVE APPLICATION</h1>
<hr />
<h3>&nbsp;</h3>
<h2>&nbsp;</h2>
<h2><strong>TO The HOD,</strong></h2>
<h2><strong>Dept. {%dept%}</strong></h2>
<h2><strong>Pune Institute of Computer Technology,</strong></h2>
<h2><strong>Pune &ndash; 5609 048.</strong></h2>
<h2><strong>&nbsp;</strong></h2>
<h2><strong>Dear Sir/Madam,</strong></h2>
<h2 style="text-align: justify;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; This is to inform you that&nbsp;I {%name%},&nbsp;</strong><strong>Class <u>{%class%}</u>,&nbsp;Roll No. <u>{%rollNo%}</u>&nbsp;Will be/was absent from the&nbsp;college on the following date / dates,&nbsp; <u>{%dateFrom%}</u></strong>&nbsp;<strong>due to {%dateTo%} for following reason : </strong></h2>
<h2 style="text-align: justify;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="background-color: #ffcc99;"><em>{%reasonForLeave%}</em></span></strong></h2>
<h2><strong>&nbsp;</strong></h2>
<h2><strong>I request that leave of absence may be granted.</strong></h2>
<h2><strong>&nbsp;</strong></h2>
<h2 style="text-align: right;"><strong>Thank you,</strong></h2>
<h2><strong>&nbsp;</strong></h2>
<h2><strong>&nbsp;</strong></h2>
<h2><strong>Date:&nbsp;<span style="text-decoration: underline;">{%dateApplied%}</span></strong></h2>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<img src="${hodSign}" alt="principal sign" width="104" height="63" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src="${hodSign}" alt="" width="104" height="63" /></strong></p>
<h2 style="text-align: left;">&nbsp;Prof. Pralhad Kulkarni&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dr. M Bagade</h2>
<h2>&nbsp; &nbsp; &nbsp;(Principal, PICT)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(HOD, IT Dept.)</h2>
</div>`

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4());
}

function generateApplicationId() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+"-"+S4()+"-"+S4());
}

// module.exports = generateApplication;
// module.exports = getApplicationPDF;
module.exports = {
    options: options,
    guidGenerator : guidGenerator,
    htmlTemplate: htmlTemplate,
    generateApplicationId: generateApplicationId
}