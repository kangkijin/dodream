var survey = survey || {};

/**
 * survey init
 */
survey.init = function() {
	return '<tr id="survey0"><td style="text-align:center;padding:0;"><input tabindex="31" class="board-input-width-05" type="text" name="texts" maxlength="100" title="" style="width:95%;"/></td>'
		+ '<td style="text-align:center;padding:0;"><span class="btn_blue"><a href="javascript:;" onclick="survey.remove(\'survey0\')">삭제</a></span></td>'
		+ '<td style="text-align:center;padding:0;">↕</td>'
		+ '</tr>';
};

/**
 * add survey file
 */
survey.add = function() {
	if (typeof this.survey_idx === 'undefined')
		this.survey_idx = 0;

	this.survey_idx++;
	$('#surveytable').append(
		'<tr id="survey' + this.survey_idx + '"><td style="text-align:center;padding:0;"><input tabindex="31" class="board-input-width-05" type="text" name="texts" maxlength="100" title="" style="width:95%;"/></td>'
		+ '<td style="text-align:center;padding:0;"><span class="btn_blue"><a href="javascript:;" onclick="survey.remove(\'survey' + this.survey_idx + '\')">삭제</a></span></td>'
		+ '<td style="text-align:center;padding:0;">↕</td>'
		+ '</tr>');
	$('.board-02').tableDnD();
};

/**
 * remove survey file
 */
survey.remove = function(id) {
	$('#' + id).remove();
};
