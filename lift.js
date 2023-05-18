const generateFloorsAndLifts = (floorCount, liftCount) => {
 // console.log(floorCount)
  generateFloors(floorCount);
  generateLifts(liftCount);
}

const generateFloors = (floorCount) => {
  let baseFloor;
  let elevator = document.getElementById('elevator');
  let rootwidth = window.innerWidth //document.getElementById('wrapper').offsetWidth;
  for(let i = 0; i <= floorCount; i++) {
    let e = document.createElement('div');
    let ei = document.createElement('div');
    ei.classList = 'w-full min-h-[240px] box-border flex gap-8';
    ei.innerHTML = `
    <div class="sticky right-0 text-slate-900 bg-transparent text-right border-t-2 w-full border-slate-800 flex flex-col items-end grow gap-2 px-2">
        <div class="absolute right-0 top-0 w-full grow border-t-4 border-blue-600 divider -mt-1"></div>
                  <div class="text-slate-800 font-medium text-lg z-15">floor-${i}</div>
                  ${ 
                  i !== 0 ?
                      `<button class='rounded-lg bg-green-500 px-3 py-2 flex items-center justify-center z-15' id='up-${i}' onclick='moveLiftUp(${i});'>
                                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                          </svg>
                                        </button>` : ''
                  }
                  <button class="rounded-lg bg-rose-500 px-3 py-2 z-15" id='down-${i}' onclick='moveLiftDown(${i})'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
    </svg>
    
                  </button>
                </div>
    `;
    e.classList = 'w-full min-h-[240px] box-border flex gap-8';
    ei.querySelector('.divider').style.minWidth = `${rootwidth}px `;
    e.innerHTML = `
          <div class="relative flex w-full" title="floorContainer" id='floor-${i}'>
          </div>
    `;
    if(i === 0) {
      baseFloor = e;
    }
    elevator.appendChild(ei);
    document.getElementById('container').appendChild(e);
  }
  return baseFloor;
}

const generateLifts = (liftCount) => {
  const baseFloor = document.getElementById('floor-0');
  for(let i = 0; i < liftCount; i++) {
    let e = document.createElement('div');
    e.classList = 'flex bg-slate-500 overflow-x-hidden min-w-[135px] h-[240px] gap-1 transition-all duration-[2500ms] ease-linear mx-2 lift z-15';
    e.dataset.position = 0;
    e.dataset.moving = 'false';
    e.setAttribute('id', `lift-${i}`)
    e.innerHTML = `
        <div class="basis-1/2 bg-slate-600 my-1 transition-all duration-[1500ms] ease-in-out leftDoor justify-items-end flex text-slate-100" id='leftDoor-lift-${i}'>${i}</div>
        <div class="basis-1/2 bg-slate-600 my-1 ease-in-out transition-all duration-[1500ms] rightDoor" id='rightDoor-lift-${i}'></div>
    `;
    baseFloor.appendChild(e);
  }
}

const moveLiftUp = (floorCount) => {
 // const lifts = getLiftsCount();
  const nearLift = getNearLiftUp(floorCount)
 // console.log('nearest lift up: ', nearLift)
//  console.log(`moving lift in rest: ${nearLift.dataset.position === 'false'}`)
  nearLift.dataset.moving = 'true';
  openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => {
    // console.log('lift callback', lift);
    nearLift.style.transition = `all ${(/*Math.round*/(2.5 * floorCount) - (nearLift.dataset.position * 2.5))}s linear`;
    nearLift.style.transform = `translateY(${ -240 * floorCount }px)`;
    setTimeout(() => {
      nearLift.addEventListener('transitionend', openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => {
        nearLift.dataset.position = floorCount;
        nearLift.dataset.moving = 'false';
      }));
    }, (/*Math.round*/(2500 * floorCount) - (nearLift.dataset.position * 2500)))
  });
}

const moveLiftDown = (floorCount) => {
  const nearLift = getNearLiftDown(floorCount)
  console.log('nearest lift down: ', nearLift)
  //console.log(`moving lift in rest: ${nearLift.dataset.position === 'false'}`)
  nearLift.dataset.moving = 'true';
  openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => {
    // console.log('lift callback', lift);
    nearLift.style.transition = `all ${(nearLift.dataset.position * 2.5) - (/*Math.round*/(2.5 * floorCount))}s linear`;
    nearLift.style.transform = `translateY(${ -240 * floorCount }px)`;
    setTimeout(() => {
      nearLift.addEventListener('transitionend', openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => {
        nearLift.dataset.position = floorCount;
        nearLift.dataset.moving = 'false';
      }));
    }, (nearLift.dataset.position * 2500) -  (/*Math.round*/(2500 * floorCount)))
  });
}

const openLiftDoors = (lift, floorCount, callback) => {
 // console.log(lift)
  const id= lift.getAttribute('id');
  const leftDoor = document.getElementById(`leftDoor-${id}`);
  const rightDoor = document.getElementById(`rightDoor-${id}`);
  leftDoor.style.transition = 'all 1.5s linear'
  rightDoor.style.transition = 'all 1.5s linear'
  leftDoor.style.transform = "translateX(-95%)";
  rightDoor.style.transform = "translateX(95%)";
  setTimeout(() => {
    leftDoor.style.transform = "translateX(0%)";
    rightDoor.style.transform = "translateX(0%)";
    setTimeout(() => {
      leftDoor.addEventListener('transitionend', callback(lift, floorCount));
    },1500)
  }, 1500)
}

const generateUserInputScreen = () => {
  let e = document.getElementById('userInput');
  e.innerHTML = `
    <div class="flex items-center justify-center h-screen grow w-full">
      <div class="bg-slate-200 rounded-lg px-5 py-2 flex flex-col gap-2 grow md:basis-2/3 lg:basis-3/4">
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
  document.getElementById('main').classList.add('hidden');
}

const showLiftSimulationScreen = () => {
  document.getElementById('userInput').classList.add('hidden');
  document.getElementById('main').classList.remove('hidden');
  moveToBottom();
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

const getNearLiftUp = (floorCount) => {
  const lifts = getLiftsCount();
  let nearLift;
  for(let i = 0; i < lifts; i++) {
    const lift = document.getElementById(`lift-${i}`);
    if(lift.dataset.position < floorCount && lift.dataset.moving === 'false') {
      if(nearLift == null) {
        nearLift = lift;
      }
      if(lift.dataset.position > nearLift.dataset.position) {
        nearLift = lift;
      }
    }
  }
 // nearLift.dataset.moving = 'true';
  return nearLift;
}

const getNearLiftDown = (floorCount) => {
  const lifts = getLiftsCount();
  let nearLift;
  for (let i = 0; i < lifts; i++) {
    const lift = document.getElementById(`lift-${i}`);
    if (lift.dataset.position > floorCount && lift.dataset.moving === 'false') {
      if (nearLift == null) {
        nearLift = lift;
      }
      if (lift.dataset.position < nearLift.dataset.position) {
        nearLift = lift;
      }
    }
  }
  // nearLift.dataset.moving = 'true';
  return nearLift;
}

const moveToBottom = () => {
  document.getElementById('wrapper').scrollTop = document.getElementById('container').scrollHeight
}
