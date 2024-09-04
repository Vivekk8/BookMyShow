import React, { useState } from "react";

let SCREENS = [
    {
        id: 1,
        time: "10.00am",
        seat: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    },
    {
        id: 2,
        time: "2.00pm",
        seat: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    },
    {
        id: 3,
        time: "6.00pm",
        seat: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    },
];


const MOVIES = [
    {
        id: 1,
        title: "Aranmanai-4",
        // image: "https://moviegalleri.net/wp-content/gallery/aranmanai4/Aranmanai-4-Movie-Images-27713b2.jpg"
         image:"https://moviegalleri.net/wp-content/uploads/2024/05/Aranmanai-4-Movie-Review.jpg"
    },
    {
        id: 2,
        title: "Star",
        image: "https://media.gv.com.sg/imagesresize/img4101.jpg",
    },
    {
        id: 3,
        title: "Aavesam",
        image: "https://upload.wikimedia.org/wikipedia/en/d/d1/Aavesham.jpg",
    },
];


const MovieBooking = () => {

    const [selectedMovie, setselectedMovie] = useState(null);
    const [selectedScreen, setselectedScreen] = useState(null);
    const [selectedSeats, setselectedSeats] = useState([]);

    const handleSeatSelect = (index , screen) =>{
        if(screen.id !== selectedScreen?.id){
            setselectedSeats([index]);
            setselectedScreen(screen)
            return
        }
        setselectedScreen(screen)
        if(selectedSeats.includes(index)){
            setselectedSeats(selectedSeats.filter((i)=> i !== index));
            if(selectedSeats.filter((i)=> i !== index).length < 1){
                setselectedScreen(null)
            }
        }
        else{
            setselectedSeats((seats)=> [...seats, index])
        }
    }

    const handleBooking = ()=>{
        alert(`Seats ${selectedSeats.map((index) => index+1).join(", ")} booked for ${selectedScreen.movie.title} at ${selectedScreen.time}`)
        SCREENS = SCREENS.map(screen => {
            if(screen.id === selectedScreen?.id){
                let seats = screen.seat;
                selectedSeats.map((seat) => (seats[seat] = 0))
                return {
                    ...screen,
                    seats
                }
            }
            return screen
        })
        setselectedMovie(null)
        setselectedScreen(null)
        setselectedSeats([])

    }

    return (
    <div>
      <h1>Movie Booking App</h1>
      <h2>Choose your movie : </h2>
      <div className="movie-selection">
        {MOVIES.map((movie) => (
          <div className="movie" key={movie.id} onClick={() => setselectedMovie(movie)}>
            <img className="movie-poster" src={movie.image} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
      </div>
      ))}
      </div>


      {selectedMovie && (
       <>
       <h2>Choose your screen</h2>
       <div className="screen-selection">
       {
        SCREENS.map((screen) => {
         return (
          <div key={screen.id} className={`screen ${screen.id === selectedScreen?.id ? 'available' : ""} ${screen.seat.includes(1) ? "available" : ""} `}>
            <div className="screen-number">Screen {screen.id}</div>
            <div className="screen-time">{screen.time}</div>
            <div className="movie-title">{selectedMovie.title}</div>
            <div className="screen-seats">
        {
          screen.seat.map((seat, index) => {
            return (
             <div key={index} className={`seat ${seat ? "available" : "unavailable"} ${selectedSeats.includes(index) && selectedScreen?.id === screen.id ? "Selected" : ""} ${selectedSeats.includes(index) ? "booked" : ""} `}
             onClick={()=>{
                if(seat){
                    handleSeatSelect(index, {
                        ...screen,
                        movie: selectedMovie
                    })
                }
             }}
             
             >

                <div className="seat-number">{ index+1 }</div>
             </div>
                 )
               })
        }
        </div>
        </div>
        )
        })
        }
        </div>
        </>
        )
        }
        <div className="booking summary">
            <div className="selected-screen">
                {
                    selectedScreen && (
                        <div>
                            <h3>Selected Screen : {selectedScreen.id}</h3>
                            <p>Time : {selectedScreen.time}</p>
                            <p>Movie : {selectedScreen.movie.title}</p>
                        </div>
                    )
                }
            </div>
        </div>

        <div className="selected-seat">
            {
                selectedScreen && selectedSeats?.length > 0 && (
                    <div>
                        <h3>Selected Seats : <>{selectedSeats.map(index => index+1).join(", ")}</></h3>
                        <h3>No of tickets : {selectedSeats?.length}</h3>
                    </div>
                )
            }
        </div>
            <button className="payment-button" onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length ===0}>Book Now</button>
        </div>
    )
}

export default MovieBooking;