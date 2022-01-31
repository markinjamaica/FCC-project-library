const mongoose = require('mongoose');

module.exports = () => {
    // Connect to database
    mongoose.connect(process.env.DB);

    // Define schemas
    const { Schema, model } = mongoose;

    const issueSchema = new Schema({
        project_name: String,
        issue_title: String,
        issue_text: String,
        created_on: Date,
        updated_on: Date,
        created_by: String,
        assigned_to: String,
        open: Boolean,
        status_text: String,
    });

    // Define models
    // const Project = model('Project', projectSchema);
    const Issue = model('Issue', issueSchema);

    return Issue;
};



