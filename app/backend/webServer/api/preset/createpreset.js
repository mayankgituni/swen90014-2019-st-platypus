const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.post('/preset/AddPreset/?:UserId', (req,res) => {
	var today = new Date();
	var date = today.getFullYear() +'-'+ (today.getMonth()+1) +'-'+ today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date +' '+ time;
	var user_id = req.param('UserId');
	var dynamic_attributes = req.body.dynamicAttributes;
	var privacy = req.body.privacy;
	var timed = req.body.timed;
	var countdown_times = req.body.countdownTimes;
	var rows = req.body.rows;
	var name = req.body.name;
	var description = req.body.description;
	var nodes_per_row = req.body.nodesPerRow;
	var number_of_targets = req.body.numberOfTargets;
	var percentage_of_targets = req.body.percentageOfTargets;
	var number_of_trails = req.body.numberOfTrails;
	var date = dateTime.toString();
	var single_shape_on_screen = req.body.singleShapeOnScreen;
	var percentage_of_near_distractor_shapes = req.body.percentageOfNearDistractorShapes;
	var percentage_of_far_distractor_shapes = req.body.percentageOfFarDistractorShapes;
	
	console.log(user_id + " " + dynamic_attributes + " " + privacy + " " + timed + " " + countdown_times + " " + rows + " " + nodes_per_row + " " + number_of_targets + " " + percentage_of_targets + " " + number_of_trails + " " + date + " " + single_shape_on_screen + " " + percentage_of_near_distractor_shapes + " " + percentage_of_far_distractor_shapes);

	console.log(req.body);
	var sql = `INSERT INTO preset (user_id, name, description,dynamic_attributes, privacy, timed, countdown_times, rows, nodes_per_row, number_of_targets, percentage_of_targets, number_of_trails, date, single_shape_on_screen, percentage_of_near_distractor_shapes, percentage_of_far_distractor_shapes) VALUES ?`;
	var values = [
		[user_id, name, description, dynamic_attributes, privacy, timed, countdown_times, rows, nodes_per_row, number_of_targets, percentage_of_targets, number_of_trails, date, single_shape_on_screen, percentage_of_near_distractor_shapes, percentage_of_far_distractor_shapes]
	];

	db.query(sql, [values], function (err, result) {
		if(err) {
			res.redirect('/ErrorPage')
		}
		console.log(result);
	  	console.log("Number of records inserted: " + result.affectedRows);
	})
	res.sendStatus(200).end();
});

module.exports = router;