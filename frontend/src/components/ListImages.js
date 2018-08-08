import React from 'react'

class ListImages extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         selectedImage: 'http://localhost:8000/public/no-image-icon-23485.jpg',
         fileName: ''
      }

      this.handleImageClick = this.handleImageClick.bind(this);
   }

   handleImageClick = (e) => {
      e.preventDefault();
      const fileName = e.target.innerText;
      this.setState({ selectedImage: `http://localhost:8000/public/images/${fileName}`, fileName: fileName });
      const divImage = document.querySelector('#divImage');
      divImage.style.display = 'block';
   }

   render() {
      const images = this.props.images;

      const aStyle = {
         textDecoration: 'none'
      }

      const divImageStyle = {
         display: 'none'
      }

      return (
         <div>
            <h2>List Images</h2>
            <div className="list-group">
               {images.map(image => (
                  <a href="" className="list-group-item" key={image.name} onClick={this.handleImageClick}>{image.name}</a>
               ))}
            </div>
            {/* <img height="130px" width="150px" src={this.state.selectedImage} alt="img"/> */}
            <div className="row" id="divImage" style={divImageStyle}>
               <div className="col-sm-6 col-md-4">
                  <div className="thumbnail">
                     <img src={this.state.selectedImage} alt={this.state.fileName} />
                     <div className="caption">
                        <h4>{this.state.fileName}</h4>
                        <p>
                           <a className="btn btn-warning" role="button">Edit</a> 
                           <a className="btn btn-danger" role="button">Delete</a>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default ListImages