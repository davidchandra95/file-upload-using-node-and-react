import React from 'react'

class Main extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         imageURL: '',
      };

      this.handleUploadImage = this.handleUploadImage.bind(this);
   }

   handleUploadImage = e => {
      e.preventDefault();

      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('filename', this.fileName.value);

      fetch('http://localhost:8000/upload', {
         method: 'POST',
         body: data,
      }).then((response) => {
         response.json().then((body) => {
            this.setState({ imageURL: `http://localhost:8000/${body.file}` });
         });
      });
   }

   render() {
      return (
         <form action="" onSubmit={this.handleUploadImage}>
            <div>
               <input type="file" ref={(ref) => {this.uploadInput = ref;}}/>
            </div>
            <div>
               <input type="text" ref={(ref) => {this.fileName = ref;}} placeholder="Enter name of file" />
            </div>
            <div>
               <button>Upload</button>
            </div>
            <img src={this.state.imageURL} alt="img"/>
         </form>
      )
   }
}

export default Main;