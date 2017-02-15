import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';

class WordEditor extends Component {
  constructor(props) {

    super(props);

    this.getGridCategories = this.getGridCategories.bind(this);

    //vars here

    this.state = {
      //States here
      file: '',
      imagePreviewURL: ''
    };

  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  getGridCategories() {
    // console.log("the data")
    //
    // var gridId = '1';  // this is the ID for core vocab
    //
    // let data = $.getJSON('http://localhost:3001/api/grids/id/1' );
    //
    // console.log("the data", data);
    //
    // console.log("parsing the data", data.responseJSON[0].list_title);
    //

    // var obj = $.getJSON('http://localhost:3001/api/grids/id/1' )
    //   .then((data) => {
    //       console.log("list titles", data.list_title);
    //   })




    console.log('nouns: ', $.getJSON('http://localhost:3001/api/lists/title/noun'))

  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} role="presentation"/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


    return (


      <div>
        <h1>Add New Word Menu</h1>
        <form>
          <label>
            Text
            <input type="text" name="word_text"/>
          </label>
          <br/>
          <div>
            <input type="file" name="filename"
                   onChange={(e) => this._handleImageChange(e)}
                   accept="image/gif, image/jpeg, image/png, image/jpg"/>
            <div className="imgPreview">
              {$imagePreview}
            </div>
          </div>
          <br/>
          <label>
            List:
            ...drop down
          </label>
          <br/>
          <ButtonToolbar>
            <Button className="CancelNewWord" bsStyle="danger" onClick={this.props.close}>
              <Glyphicon glyph="glyphicon glyphicon-remove-sign" aria-label="Clear Message Button"/>
              Cancel
            </Button>
            <Button type="submit" className="SubmitNewWord" bsStyle="primary">Submit </Button>
          </ButtonToolbar>
        </form>


      </div>


      // <Dropzone multiple={false}
      //     accept="image/jpg,image/png,image/gif"
      //     onDrop={this.onImageDrop}>
      //     <p>Drop an image or click to select a file to upload.</p>
      // </Dropzone>
    );

  }
}

WordEditor.propTypes = {
  close: React.PropTypes.array,
};


export default WordEditor;

