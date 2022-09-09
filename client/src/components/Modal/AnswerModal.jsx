import React from 'react';
import './Modal.css';
import axios from 'axios';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      answer: '',
      email: '',
      files: [],
      showUpload: true,
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleAnswer(e) {
    this.setState({
      answer: e.target.value,
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleFile(e) {
    if (this.state.files.length > 4) {
      this.setState({
        showUpload: false,
      });
    };

    const photos = this.state.files.slice();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "zm7ucgaq")

    axios.post("https://api.cloudinary.com/v1_1/ddcvif9vu/image/upload", formData)
      .then((response) => {
        //console.log(response.data.url);
        let photoURL = response.data.url;
        photos.push(photoURL);
        this.setState({
          files: photos,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('body', this.state.answer);
    formData.append('name', this.state.username);
    formData.append('email', this.state.email);
    formData.append('photos', this.state.files);

    // console.log(Object.fromEntries(formData.entries()));
    // // formData = JSON.stringify(formData);
    // console.log([...formData]);

    axios({
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${this.props.questionid}/answers`,
      data: {
        "body": this.state.answer,
        "name": this.state.username,
        "email": this.state.email,
        "photos": this.state.files,
      },
      headers: {
        Authorization: process.env.API_KEY,
        // 'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.onClose();
    // console.log(this.props.questionid);
  }

  render() {

    const photoThumbs = this.state.files.map((fileURL) => {
      return <img className="photoThumb" src={fileURL}></img>
    });

    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" onClick={this.props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Submit Your Answer</h2>
            <h3>{this.props.product.name}: {this.props.question.question_body}</h3>
          </div>
          <div className="modal-body">
            <form>
              <label>
                What is your nickname? *
                <br/>
                <input
                  name="username"
                  type="text"
                  placeholder="Example: jack543!"
                  minLength="3"
                  maxLength="60"
                  value={this.state.username}
                  onChange={this.handleUsername}
                  required="true"
                />
                <br/>
                <span>Username Required</span>
              </label>
              <p className="subtext">For privacy reasons, do not use your full name or email address</p>
              <br/>
              <label>
                What is your email? *
                <br/>
                <input
                  name="email"
                  type="email"
                  placeholder="Example: jack@email.com"
                  maxLength="60"
                  value={this.state.email}
                  onChange={this.handleEmail}
                  required="true"
                />
                <br/>
                <span>Valid Email Required</span>
                <p className="subtext">For authentication reasons, you will not be emailed</p>
              </label>
              <br/>
              <label>
                Your Answer: *
                <br/>
                <textarea
                  rows="4"
                  cols="30"
                  name="answer"
                  type="text"
                  value={this.state.answer}
                  onChange={this.handleAnswer}
                  required="true"
                />
                <br/>
                <span>Answer Required</span>
              </label>
              <br/>
              <br/>
              <div id="hideUploadContainer">
                <div id="hideUpload" className={this.state.showUpload ? "showU" : "hideU"}>
                  <label htmlFor="fileInput" className="button">
                    Upload an image
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    onChange={this.handleFile}
                    className="show-for-sr"
                  />
                </div>
              </div>
              {photoThumbs}
            </form>
          </div>
          <div className='modal-footer'>
            <button onClick={this.handleSubmit} className='button'>Submit</button>
          </div>
        </div>
      </div>
    )
  };
};

export default AnswerModal;
