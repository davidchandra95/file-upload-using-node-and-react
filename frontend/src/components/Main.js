import React from 'react'
import ListImages from './ListImages'

class Main extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         imageURL: '',
         images: [],
      };

      this.handleUploadImage = this.handleUploadImage.bind(this);
   }

   componentDidMount() {
      this.getImages();
   }

   getImages = () => {
      fetch('http://localhost:8000/files', {
         method: 'GET'
      }).then((response) => {
         response.json().then((body) => {
            const tes = body.files.map((file) => {
               return {link: `http://localhost:8000/public/images/${file}`, name: file}
            })
            this.setState({images: tes});
         });
      });
   }

   handleUploadImage = e => {
      e.preventDefault();

      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('filename', this.fileName.value == '' ? this.uploadInput.files[0].name.split('.')[0] : this.fileName.value);

      fetch('http://localhost:8000/upload', {
         method: 'POST',
         body: data,
      }).then((response) => {
         response.json().then((body) => {
            const notif = document.querySelector('#notif');
            notif.innerHTML = "Success upload image.";
            notif.style.display = 'block'
            this.setState({ imageURL: `http://localhost:8000/${body.file}` });
            this.getImages()
         });
      });
   }

   render() {
      return (
         <form action="" onSubmit={this.handleUploadImage}>
            <div className="form-group">
               <input className="form-control" type="file" ref={(ref) => {this.uploadInput = ref;}}/>
            </div>
            <div className="form-group">
               <input className="form-control" type="text" ref={(ref) => {this.fileName = ref;}} placeholder="Enter name of file" />
            </div>
            <div className="form-group">
               <button className="btn btn-primary">Upload</button>
            </div>
            <ListImages images={this.state.images} />
         </form>
      )
   }
}

export default Main;