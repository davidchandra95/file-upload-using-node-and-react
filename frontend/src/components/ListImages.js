import React from 'react'

class ListImages extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         selectedImage: ''
      }

      this.handleImageClick = this.handleImageClick.bind(this);
   }

   handleImageClick = (e) => {
      e.preventDefault();
      const fileName = e.target.innerText;
      this.setState({ selectedImage: `http://localhost:8000/public/images/${fileName}` });
   }

   render() {
      const images = this.props.images;

      return (
         <div>
            <h2>List Images</h2>
            <ul>
               {images.map(image => (
                  <li key={image.name} onClick={this.handleImageClick}>{image.name}</li>
               ))}
            </ul>
            <img height="130px" width="150px" src={this.state.selectedImage} alt="img"/>
         </div>
      )
   }
}

export default ListImages