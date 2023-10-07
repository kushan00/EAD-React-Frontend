import React from 'react'
import img4 from "../images/img2.jpg"
import img5 from "../images/img1.jpg"
import img6 from "../images/img3.jpg"
import img7 from "../images/train.gif"

const Home = () => {
  return (
    <div>
      <center><h2 style={{color:'white',fontStyle:'unset' , fontSize:"40px"}}>Welcome</h2></center>

      <p style={{color:'white',fontStyle:'unset'}}>
        Welcome to our travel booking platform! At the heart of our system is a dedicated Backoffice team 
        responsible for curating and updating essential train information and schedules, ensuring a seamless booking experience. 
        Whether you prefer the convenience of our mobile app or the personalized assistance of a travel agent using our web-based 
        client, we've got you covered. Once your booking is confirmed, you can easily access your travel details on your mobile app dashboard,
         which conveniently displays both your past travel history and upcoming journeys.
      </p>

      <p style={{color:'white',fontStyle:'unset'}}>
        We understand that plans can change, so we offer flexibility when it comes to cancellations. You can cancel your bookings 
        directly through the mobile app or, if you prefer, coordinate with one of our travel agents who have access to your travel 
        history and details, ensuring efficient and hassle-free assistance. Your travel experience is our top priority, and we're 
        here to make it as convenient and enjoyable as possible.
      </p>
      <center>
        <img src={img7} alt="img7" style={{width:'60%',height:'80%',boxShadow:"20px 20px 70px grey"}}/>
        {/* <div style={{ width: "80%", marginTop: "50px", float: 'center' }}>
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={img4} alt="First slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={img5} alt="Second slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={img6} alt="Third slide" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div> */}
      </center>
    </div>
  )
}

export default Home