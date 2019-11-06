const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.put('/preset/EditPreset/?:UserId/?:PresetId', (req,res) => {
	var user_id = req.param('UserId');
	var preset_id = req.param('PresetId');
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
	var single_shape_on_screen = req.body.singleShapeOnScreen;
	var percentage_of_near_distractor_shapes = req.body.percentageOfNearDistractorShapes;
	var percentage_of_far_distractor_shapes = req.body.percentageOfFarDistractorShapes;
	
	console.log(user_id + " " + dynamic_attributes + " " + privacy + " " + timed + " " + countdown_times + " " + rows + " " + nodes_per_row + " " + number_of_targets + " " + percentage_of_targets + " " + number_of_trails + " " + single_shape_on_screen + " " + percentage_of_near_distractor_shapes + " " + percentage_of_far_distractor_shapes);

	console.log(user_id);
	var sql = `UPDATE preset SET dynamic_attributes = ?, name=?, description=?, privacy = ?, timed = ?, countdown_times = ?, rows = ?, nodes_per_row = ?, number_of_targets = ?, percentage_of_targets = ?, number_of_trails = ?, single_shape_on_screen = ?, percentage_of_near_distractor_shapes = ?, percentage_of_far_distractor_shapes = ? WHERE user_id = ? AND preset_id = ?`;
	var values = [dynamic_attributes, name, description, privacy, timed, countdown_times, rows, nodes_per_row, number_of_targets, percentage_of_targets, number_of_trails, single_shape_on_screen, percentage_of_near_distractor_shapes, percentage_of_far_distractor_shapes, user_id, preset_id];

    db.query(sql, values, function (err, result) {
      	if(err) {
        	res.redirect('/ErrorPage')
		}
		console.log(result);
	  	console.log("Number of records inserted: " + result.affectedRows);
	})
	res.sendStatus(200).end();
});

module.exports = router;