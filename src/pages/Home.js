import React from 'react'
import img4 from "../images/img2.jpg"
import img5 from "../images/img1.jpg"
import img6 from "../images/img3.jpg"
import img7 from "../images/train.gif"

const Home = () => {
  return (
    <div>
      <center><h2 style={{
        color: 'white',
        fontSize: '40px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        backgroundColor: 'Silver',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textAlign: 'center',
        textShadow: '4px 4px 4px rgba(0, 0, 0, 0.3)',
        width: '1250px'
      }}>Hi, Welcome To Online Train Booking System</h2></center>
      <br></br>


<center>
  <div style={{ width: "45%", marginTop: "50px", float: 'center' }}>
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div style={{ border: '3px solid white' }}> {/* Add a white border */}
            <img className="d-block w-100" src={img4} alt="First slide" />
          </div>
        </div>
        <div className="carousel-item">
          <div style={{ border: '3px solid white' }}> {/* Add a white border */}
            <img className="d-block w-100" src={img5} alt="Second slide" />
          </div>
        </div>
        <div className="carousel-item">
          <div style={{ border: '3px solid white' }}> {/* Add a white border */}
            <img className="d-block w-100" src={img6} alt="Third slide" />
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
</center>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
     
      <p style={{
         color: 'white',
         fontSize: '12px',
         fontFamily: 'Arial, sans-serif',
        //  fontWeight: 'bold',
         backgroundColor: 'CD5C5C',
         padding: '10px',
         borderRadius: '5px',
         boxShadow: '0 14px 6px rgba(0, 0, 0, 0.1)',
         textTransform: 'uppercase',
         letterSpacing: '2px',
         textAlign: 'center',
         textShadow: '10px 10px 10px rgba(0, 0, 0, 0.3)',
         width: '1450px'
      }}>
        Welcome to our travel booking platform! At the heart of our system is a dedicated Backoffice team
        responsible for curating and updating essential train information and schedules, ensuring a seamless booking experience.
        Whether you prefer the convenience of our mobile app or the personalized assistance of a travel agent using our web-based
        client, we've got you covered. Once your booking is confirmed, you can easily access your travel details on your mobile app dashboard,
        which conveniently displays both your past travel history and upcoming journeys.
        We understand that plans can change, so we offer flexibility when it comes to cancellations. You can cancel your bookings
        directly through the mobile app or, if you prefer, coordinate with one of our travel agents who have access to your travel
        history and details, ensuring efficient and hassle-free assistance. Your travel experience is our top priority, and we're
        here to make it as convenient and enjoyable as possible.
      </p>

    </div>
  )
}

export default Home