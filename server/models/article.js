var mongoose = require('mongoose');
var ArticleSchema = new mongoose.Schema({
	title: String,
	article_url: String,
	text_line: String,
	src_name: String,
	img_url: String,
	created_at: Date,
	updated_at: Date
});

mongoose.model('Article', ArticleSchema);