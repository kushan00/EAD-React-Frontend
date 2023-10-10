import React , {useState} from 'react'
import './search.css'
import Select from "react-select";
import { searchSchedules } from '../services/ScheduleService';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const options = [
    { label: "ABANPOLA", value: "3" },
    { label: "ADAGALA", value: "410" },
    { label: "AGBOPURA", value: "13" },
    { label: "AHANGAMA", value: "11" },
    { label: "AHUNGALLE", value: "18" },
    { label: "AKURALA", value: "7" },
    { label: "ALAWATUPITIYA", value: "22" },
    { label: "ALAWWA", value: "9" },
    { label: "ALUTH AMBALAMA", value: "329" },
    { label: "ALUTHGAMA", value: "8" },
    { label: "AMBALANGODA", value: "1" },
    { label: "AMBEWELA", value: "2" },
    { label: "AMBEYPUSSA", value: "14" },
    { label: "ANAWILUNDAWA", value: "19" },
    { label: "ANDADOLA", value: "10" },
    { label: "ANGAMPITIYA", value: "5" },
    { label: "ANGULANA", value: "4" },
    { label: "ANURADHAPURA", value: "12" },
    { label: "ANURADHAPURA TOWN", value: "15" },
    { label: "ARACHCHIKATTUWA", value: "6" },
    { label: "ARAPATHGAMA", value: "343" },
    { label: "Arivial Nagar", value: "483" },
    { label: "ARUKKUWATTE", value: "16" },
    { label: "ASELAPURA", value: "17" },
    { label: "ASGIRIYA", value: "467" },
    { label: "AUKANA", value: "21" },
    { label: "AVISSAWELLA", value: "20" },
    { label: "BADULLA", value: "23" },
    { label: "BALANA", value: "31" },
    { label: "BALAPITIYA", value: "34" },
    { label: "BAMBALAPITIYA", value: "35" },
    { label: "BAMBARENDA", value: "488" },
    { label: "BANDARAWELA", value: "25" },
    { label: "Bandirippuwa", value: "475" },
    { label: "BANGADENIYA", value: "28" },
    { label: "BASELINE ROAD", value: "39" },
    { label: "BATTALUOYA", value: "33" },
    { label: "BATTICALOA", value: "24" },
    { label: "BATUWATTE", value: "41" },
    { label: "BELIATHTHA", value: "490" },
    { label: "BEMMULLA", value: "26" },
    { label: "BENTOTA", value: "32" },
    { label: "BERUWALA", value: "36" },
    { label: "BOLAWATTE", value: "30" },
    { label: "BOOSSA", value: "38" },
    { label: "BORELESSA", value: "37" },
    { label: "BOTALE", value: "40" },
    { label: "BULUGAHAGODA", value: "27" },
    { label: "BUTHGAMUWA", value: "29" },
    { label: "CHAVAKACHCHERI", value: "398" },
    { label: "CHEDDIIKULAM", value: "371" },
    { label: "CHILAW", value: "44" },
    { label: "CHINA BEY", value: "43" },
    { label: "CHUNNAKAM", value: "423" },
    { label: "COLOMBO FORT", value: "61" },
    { label: "COTTA ROAD", value: "46" },
    { label: "DARALUWA", value: "53" },
    { label: "DEHIWALA", value: "54" },
    { label: "Dekinda", value: "337" },
    { label: "DEMATAGODA", value: "47" },
    { label: "DEMODARA", value: "48" },
    { label: "DEWAPURAM", value: "52" },
    { label: "DEWEDDA", value: "417" },
    { label: "DIYATALAWA", value: "50" },
    { label: "DODANDUWA", value: "51" },
    { label: "EGODA UYANA", value: "60" },
    { label: "ELIPHANT PASS", value: "395" },
    { label: "ELLE", value: "57" },
    { label: "ELUTHUMATTUVAL", value: "401" },
    { label: "ELWALA", value: "341" },
    { label: "ENDERAMULLA", value: "55" },
    { label: "ERATTAPERIYAKULAM", value: "56" },
    { label: "ERAVUR", value: "59" },
    { label: "ERUKKALAM PENDU", value: "58" },
    { label: "FREE TRADE ZONE", value: "104" },
    { label: "GALABODA", value: "64" },
    { label: "GALGAMUWA", value: "69" },
    { label: "GALLE", value: "68" },
    { label: "GALLELLA", value: "62" },
    { label: "GALOYA JUNCTION", value: "74" },
    { label: "GAMMANA", value: "70" },
    { label: "GAMPAHA", value: "75" },
    { label: "GAMPOLA", value: "76" },
    { label: "GANEGODA", value: "71" },
    { label: "GANEMULLA", value: "63" },
    { label: "GANEWATTE", value: "73" },
    { label: "Gangathilaka", value: "479" },
    { label: "GANGODA", value: "65" },
    { label: "GANTALAWA", value: "440" },
    { label: "GELIOYA", value: "66" },
    { label: "GINTHOTA", value: "72" },
    { label: "GIRAMBE", value: "67" },
    { label: "GIRIDIYA", value: "478" },
    { label: "GIRITALE", value: "77" },
    { label: "GIRUNAVALA", value: "78" },
    { label: "GOBAGODA", value: "88" },
    { label: "GODAKAWELA", value: "86" },
    { label: "GODAGAMA", value: "87" },
    { label: "GODAGAMA SOUTH", value: "85" },
    { label: "GODAKANDA", value: "79" },
    { label: "GODAKANDA SOUTH", value: "80" },
    { label: "GODAMUNNA", value: "81" },
    { label: "GODAPITIYA", value: "82" },
    { label: "GODAPOLA", value: "83" },
    { label: "GODAVARIGAMA", value: "84" },
    { label: "GODAWELA", value: "95" },
    { label: "GONAGALA", value: "96" },
    { label: "GONAPINUWARA", value: "97" },
    { label: "GONAPOLA", value: "98" },
    { label: "GONAWILA", value: "92" },
    { label: "GONAWILA SOUTH", value: "91" },
    { label: "Gonawila Watta", value: "475" },
    { label: "GOOTY", value: "93" },
    { label: "GOPALAWA", value: "89" },
    { label: "GORAKANA", value: "94" },
    { label: "GOTHATUWA", value: "90" },
    { label: "HABARADUWA", value: "103" },
    { label: "HABARANA", value: "102" },
    { label: "HAKGALA", value: "105" },
    { label: "HALBARAWA", value: "104" },
    { label: "HAKBANGA", value: "100" },
    { label: "HAKURUWELA", value: "101" },
    { label: "HALDANDUWA", value: "106" },
    { label: "HAMBANTOTA", value: "109" },
    { label: "HANGURANKETHA", value: "115" },
    { label: "HANGURANKETHA EAST", value: "116" },
    { label: "HANWELLA", value: "108" },
    { label: "HAPUGALA", value: "117" },
    { label: "HAPUGASTALAWA", value: "118" },
    { label: "HAPUGODA", value: "119" },
    { label: "HAPUGODA EAST", value: "120" },
    { label: "HATAGALA", value: "121" },
    { label: "HATTON", value: "110" },
    { label: "HEDALA", value: "111" },
    { label: "HEMALENDA", value: "112" },
    { label: "HENDALA", value: "113" },
    { label: "HENEGAMA", value: "114" },
    { label: "HENEGAMA NORTH", value: "122" },
    { label: "HENGAWALA", value: "124" },
    { label: "HERMANNUS", value: "129" },
    { label: "HETTIPOLA", value: "125" },
    { label: "HIKKADUWA", value: "126" },
    { label: "HIMBUTANA", value: "127" },
    { label: "HINATIVINNA", value: "128" },
    { label: "HIRANA", value: "130" },
    { label: "HOMAGAMA", value: "133" },
    { label: "HORANA", value: "131" },
    { label: "HORAPOLA", value: "132" },
    { label: "HUWAGAMA", value: "137" },
    { label: "IHALA GODEGAMA", value: "140" },
    { label: "IHALA HINATIVINNA", value: "139" },
    { label: "IHALA PELANDA", value: "138" },
    { label: "IHALA PILIYANDALA", value: "135" },
    { label: "IHALA TALAGAHAGODA", value: "136" },
    { label: "INDURUWA", value: "142" },
    { label: "INGINIYAGALA", value: "141" },
    { label: "INGIRIYA", value: "143" },
    { label: "IRAGAMA", value: "144" },
    { label: "IRANAWILA", value: "145" },
    { label: "JAFFNA", value: "146" },
    { label: "JA-ELA", value: "148" },
    { label: "KADAWATA", value: "156" },
    { label: "KADDUWA", value: "155" },
    { label: "KADIGAWA", value: "157" },
    { label: "KADUGALA", value: "150" },
    { label: "KADUGANNAWA", value: "158" },
    { label: "KADURUPPUWA", value: "149" },
    { label: "KADUWELA", value: "154" },
    { label: "KAHAGOLLA", value: "161" },
    { label: "KAHATHUDUWA", value: "162" },
    { label: "KAHAWA", value: "159" },
    { label: "KAHAWATTA", value: "153" },
    { label: "KAHAWATTA NORTH", value: "152" },
    { label: "KAHAWATTA WEST", value: "151" },
    { label: "KAHETAWELA", value: "160" },
    { label: "KAIKAWALA", value: "163" },
    { label: "KAKIRAWA", value: "164" },
    { label: "KAKULUVA", value: "165" },
    { label: "KALAPALUWA", value: "168" },
    { label: "KALAWANA", value: "169" },
    { label: "KALAWILA", value: "166" },
    { label: "KALAWILA WEST", value: "167" },
    { label: "KALDAMULLA", value: "170" },
    { label: "KALELIYA", value: "171" },
    { label: "KALELIPOLA", value: "172" },
  ];

const TravellerBooking = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
      Cookies.remove("TrainLogin");
      window.location.reload();
      navigate("/");
    }

    const [startCity, setstartCity] = useState('');
    const [endCity, setendCity] = useState('');
    const [bookTime, setbookTime] = useState('');
  
    const handleSearch = async (e) => {
        e.preventDefault();
      // Implement your search logic here
      console.log('Searching...');
      console.log(startCity,endCity,bookTime)
      let data = await searchSchedules(startCity?.label,endCity?.label,bookTime)
      console.log("schedules",data);
    };

    const handleStartCityChange = (selectedOption) => {
        setstartCity(selectedOption);
      };

      const handleEndCityChange = (selectedOption) => {
        setendCity(selectedOption);
      };

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

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

      <button 
            style={{width:"150px"}}
            type="submit" 
            className="btn btn-success" 
            onClick={()=>handleLogout()}
        >
        Logout
        </button>


      <div className="search-container">
      <div className="container" style={{ width: "100%" }}>
        <form className="form-group">
         <Select
            className="form-control"
            value={startCity}
            onChange={handleStartCityChange}
            options={options}
        />
        <br/>
            <Select
                className="form-control"
                value={endCity}
                onChange={handleEndCityChange}
                options={options}
            />
        <br/>
            <input
            className="form-control"
            type="time"
            placeholder="time"
            value={bookTime}
            onChange={(e) => setbookTime(e.target.value)}
            />
        <div className="search-button">
            <button onClick={(e)=>{handleSearch(e)}}>Search</button>
        </div>
      </form>
      </div>
    </div>

      
     


    </div>
  )
}

export default TravellerBooking