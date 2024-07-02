import React, { useContext, useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';
import './AuctionCard.css';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }

  const userHasBid = props.item.bidHistory?.some(bid => bid.user === props.owner?.email);

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${props.item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />
        <div className="card-body">
          <p className="lead display-6">{props.item.title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              {days} Días {hours} horas {minutes} mins {seconds} seg
            </h5>
          </div>
          <p className="card-text">{props.item.desc}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!props.owner ? (
                <div
                  onClick={() => props.bidAuction()}
                  className="btn btn-outline-secondary"
                >
                  Apostar
                </div>
              ) : props.owner.email === props.item.email ? (
                <div
                  onClick={() => props.endAuction(props.item.id)}
                  className="btn btn-outline-secondary"
                >
                  Cancelar Subasta
                </div>
              ) : (
                <>
                  {props.owner.email === props.item.curWinner ? (
                    <p className="display-6">
                      Ganador: {props.item.curWinner}
                    </p>
                  ) : (
                    <div
                      onClick={() =>
                        props.bidAuction(props.item.id, props.item.curPrice)
                      }
                      className="btn btn-outline-secondary"
                      disabled={userHasBid} // Disable the button if the user has already bid
                    >
                      Ofertar
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="display-6">${props.item.curPrice}</p>
          </div>
          {userHasBid && props.showBidMessage && (
            <p className="text-danger">
              Espera a que otro usuario apueste antes de volver a ofertar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  const [showBidMessage, setShowBidMessage] = useState(false);
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  const handleBidAuction = async (auctionId, currentPrice) => {
    try {
      await bidAuction(auctionId, currentPrice);
      setShowBidMessage(true);
    } catch (error) {
      // Handle error if necessary
    }
  };

  useEffect(() => {
    setShowBidMessage(false);
  }, [item.curPrice]);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={handleBidAuction}
      endAuction={endAuction}
      item={item}
      showBidMessage={showBidMessage}
      renderer={renderer}
    />
  );
};