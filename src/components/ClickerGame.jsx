import React, {useState, useEffect} from 'react'

function ClickerGame(){
    const [coins, setCoins] = useState(0);
    const [clickPrice, setClickPrice] = useState(1);
    const [autoClicker, setAutoClicker] = useState(0);
    const [clicksPerSec, setClicksPerSec] = useState(0);
    


    useEffect(() => {
        const saved = localStorage.getItem('clickerGame');
        if(saved) {
            const data = JSON.parse(saved); 
            setCoins(data.coins || 0);
            setClickPrice(data.clickPrice || 1);
            setAutoClicker(data.autoClicker || 0);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('clickerGame', JSON.stringify({
            coins, clickPrice, autoClicker
        }))
    }, [coins, clickPrice, autoClicker])

    useEffect(() => {
        const interval = setInterval(() => {
            setCoins(prev => prev + autoClicker);
        }, 1000)
        return () => clearInterval(interval);
    }, [autoClicker])

    useEffect(() => {
        if(coins >= 50 * clickPrice){
            setCoins(coins- 50*clickPrice)
            setClickPrice(prev => prev+1);
        }
    }, [coins])

    const buyAutoClicker = () => {
        if(coins >= autoClicker*10){
            setCoins(prev => prev-autoClicker*10);
            setAutoClicker(prev => prev+1);
        }
    };

    const handleClick = () => {
        setCoins(prev => prev + clickPrice);
    };

    const restartGame = () => {
        localStorage.removeItem('clickerGame');
        setCoins(0);
        setClickPrice(1);
        setAutoClicker(0);
    }

    return (
        <div className="clicker-game">
            <div className="clicker__stats">
                <h1>Монет: {coins.toLocaleString()}</h1>
                <div className="clcker__stats-row">
                    <p>Цена нажатия: {clickPrice}</p>
                    <p>Авто-кликеры: {autoClicker}</p>
                </div>
            </div>

            <button className="click-button" onClick={handleClick}>
                Кликни
            </button>
        
            <button className='buy-button' disabled={coins<autoClicker*10} onClick={buyAutoClicker}>
                Купить Кирку (Нужно {autoClicker*10} монет)
            </button>

            <button className="restart-button" onClick={restartGame}>
                Начать заново
            </button>

            <div className="progress">
                До следующего уровня: {50 * clickPrice - coins}
            </div>
        </div>
    )
}

export default ClickerGame;