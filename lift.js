const generateFloorsAndLifts = (floorCount, liftCount) => {
  console.log(floorCount)
  generateFloors(floorCount);
  generateLifts(liftCount);
}

const generateFloors = (floorCount) => {
  let baseFloor;
  for(let i = 0; i <= floorCount; i++) {
    let e = document.createElement('div');
    e.classList = 'w-full min-h-[240px] box-border flex gap-8';
    e.innerHTML = `
          <div class="relative flex w-full" title="floorContainer" id='floor-${i}'>
            <div class="absolute text-slate-900 bg-transparent text-right border-t-2 w-full border-slate-800">
              <div>floor-${i}</div>
              <button id='up-${i}' onclick='moveLiftUp(${i});'>up</button>
              <button id='down-${i}' onclick='moveLiftDown(${i})'>down</button>
            </div>
          </div>
    `;
    if(i === 0) {
      baseFloor = e;
    }
    document.getElementById('container').appendChild(e);
  }
  return baseFloor;
}

const generateLifts = (liftCount) => {
  const baseFloor = document.getElementById('floor-0');
  for(let i = 0; i < liftCount; i++) {
    let e = document.createElement('div');
    e.classList = 'flex bg-slate-500 overflow-x-hidden min-w-[135px] h-[240px] gap-1 transition-all duration-[2500ms] ease-linear mx-2 lift';
    e.dataset.position = 0;
    e.dataset.moving = 'false';
    e.setAttribute('id', `lift-${i}`)
    e.innerHTML = `
        <div class="basis-1/2 bg-slate-600 my-1 transition-all duration-[2500ms] ease-in-out leftDoor" id='leftDoor-lift-${i}'></div>
        <div class="basis-1/2 bg-slate-600 my-1 ease-in-out transition-all duration-[2500ms] rightDoor" id='rightDoor-lift-${i}'></div>
    `;
    baseFloor.appendChild(e);
  }
}

const moveLiftUp = (floorCount) => {
  const lifts = getLiftsCount();
  for(let i = 0; i < lifts; i++) {
   const lift = document.getElementById(`lift-${i}`);
   console.log(lift.getAttribute('id'), document.getElementById(`lift-${i}`).dataset.moving)
   if((lift.dataset.position < floorCount) && (lift.dataset.moving === 'false')) {
     if(lift.dataset.moving === 'true')
       continue;
     lift.dataset.moving = 'true';
     openLiftDoors(lift, floorCount, (lift, floorCount) => {
      // console.log('lift callback', lift);
       lift.style.transition = `all ${(Math.round(2.5 * floorCount) - (lift.dataset.position * 2.5))}s linear`;
       lift.style.transform = `translateY(${ -240 * floorCount }px)`;
       setTimeout(() => {
         lift.addEventListener('transitionend', openLiftDoors(lift, floorCount, (lift, floorCount) => {
           lift.dataset.position = floorCount;
           lift.dataset.moving = 'false';
         }));
       }, (Math.round(2500 * floorCount) - (lift.dataset.position * 2500)))
     });
     console.log(document.getElementById(`lift-${i}`).dataset.moving);
     break;
   }
  }
}

const moveLiftDown = (floorCount) => {
  const lifts = getLiftsCount();
  for (let i = 0; i < lifts; i++) {
    const lift = document.getElementById(`lift-${i}`);
    console.log(lift.getAttribute('id'), document.getElementById(`lift-${i}`).dataset.moving)
    if ((lift.dataset.position > floorCount) && (lift.dataset.moving === 'false')) {
      lift.dataset.moving = 'true';
      openLiftDoors(lift, floorCount, (lift, floorCount) => {
        // console.log('lift callback', lift);
        lift.style.transition = `all ${(lift.dataset.position * 2.5) - (Math.round(2.5 * floorCount))}s linear`;
        lift.style.transform = `translateY(${ -240 * floorCount }px)`;
        setTimeout(() => {
          lift.addEventListener('transitionend', openLiftDoors(lift, floorCount, (lift, floorCount) => {
            lift.dataset.position = floorCount;
            lift.dataset.moving = 'false';
          }));
        }, ((lift.dataset.position * 2500) - (Math.round(2500 * floorCount))))
      });
      break;
    }
    openLiftDoors(lift);
    lift.dataset.moving = 'false';
  }
}

const openLiftDoors = (lift, floorCount, callback) => {
  //console.log(lift)
  const id= lift.getAttribute('id');
  const leftDoor = document.getElementById(`leftDoor-${id}`);
  const rightDoor = document.getElementById(`rightDoor-${id}`);
  leftDoor.style.transform = "translateX(-95%)";
  rightDoor.style.transform = "translateX(95%)";
  setTimeout(() => {
    leftDoor.style.transform = "translateX(0%)";
    rightDoor.style.transform = "translateX(0%)";
    setTimeout(() => {
      leftDoor.addEventListener('transitionend', callback(lift, floorCount));
    },2500)
  }, 2500)
}

const generateUserInputScreen = () => {
  let e = document.getElementById('userInput');
  e.innerHTML = `
    <div class="flex items-center justify-center h-screen">
      <div class="bg-slate-200 rounded-lg px-5 py-2 mx-auto flex flex-col">
        <legend class="text-2xl">Fill the form for Lift Simulation</legend>
        <label>Enter the no of Floors:</label>
        <input id='floorInput' class="px-3 py-1 rounded" type="number" required name="floors" min="1" value="1" />
        <label>Enter the no of Lifts:</label>
        <input id="liftInput" class="px-3 py-1 rounded" type="number" required name="lifts" min="1" value="1" />
        <input type="submit" value="submit" class="px-3 py-2 rounded-lg bg-green-500 my-2 text-slate-900" onclick="showLiftSimulationScreen(); generateFloorsAndLifts(getFloorsCount(), getLiftsCount())" />
      </div>
    </div>
  `;
}

const showUserInputScreen = () => {
  document.getElementById('userInput').classList.remove('hidden');
  document.getElementById('container').classList.add('hidden');
}

const showLiftSimulationScreen = () => {
  document.getElementById('userInput').classList.add('hidden');
  document.getElementById('container').classList.remove('hidden');
}

const getFloorsCount = () => {
  return document.getElementById('floorInput').value;
}
const getLiftsCount = () => {
  return document.getElementById('liftInput').value;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const wait = async () => {
  await delay(2500)
}
