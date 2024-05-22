import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(onVideoPlay, 1000));

function onVideoPlay(data) {
  let currentTime = Math.round(data.seconds);
  localStorage.setItem('videoplayer-current-time', currentTime);
}

function playBack() {
  const pause = JSON.parse(localStorage.getItem('videoplayer-current-time'));

  if (pause === null) {
    return;
  }

  player.setCurrentTime(pause);
}

playBack();

// player
//   .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
//   .then(function (seconds) {
//     // seconds = the actual time that the player seeked to
//   })
//   .catch(function (error) {
//     switch (error.name) {
//       case 'RangeError':
//         // the time was less than 0 or greater than the video’s duration
//         break;

//       default:
//         // some other error occurred
//         break;
//     }
//   });
