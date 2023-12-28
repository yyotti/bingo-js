"use strict";

const BINGO_KEY = "bingo";

const INITIAL_STORAGE = {
  nums: [],
};

const setLocalStorage = (obj) => {
  const json = JSON.stringify(obj);
  localStorage.setItem(BINGO_KEY, json);
};

const getLocalStorage = () => {
  if (localStorage.getItem(BINGO_KEY) === null) {
    setLocalStorage({ ...INITIAL_STORAGE });
  }
  
  const json = localStorage.getItem(BINGO_KEY);
  return JSON.parse(json);
};

const init = () => {
  document.querySelector('#clear').addEventListener('click', clear);
  document.querySelector('#exec').addEventListener('click', exec);

  showSelectedNumbers();
};

const clear = () => {
  localStorage.removeItem(BINGO_KEY);

  showSelectedNumbers();
};

const getRandamNum = (nums) => {
  if (nums.length >= 50) {
    return 0;
  }

  const min = 1;
  const max = 50;

  let n;
  do {
    n = Math.floor( Math.random() * (max + 1 - min) ) + min;
  } while (nums.find((m) => m === n) === n);

  return n;
};

const exec = (e) => {
  const storage = getLocalStorage();
  if (storage.nums.length >= 50) {
    alert('終わり！！');
    return;
  }

  e.target.disabled = true;

  setTimeout(shuffle, 100, 0, 0);
};

const shuffle = (cnt, beforeN) => {
  if (cnt > 20) {
    selectNum();
    return;
  }

  let n;
  do {
    n = getRandamNum([]);
  } while (n === beforeN);
  showNum(n);

  setTimeout(shuffle, 100, cnt + 1, n);
};

const selectNum = () => {
  const storage = getLocalStorage();

  const n = getRandamNum(storage.nums);
  showNum(n);
  storage.nums.push(n);

  setLocalStorage(storage);
  showSelectedNumbers();

  document.querySelector('#exec').disabled = false;
};

const showNum = (n) => {
  document.querySelector('#ball-num').innerText = n;
};

const showSelectedNumbers = () => {
  document.querySelectorAll('.history .num').forEach((e) => {
    e.classList.remove('selected');
  });

  getLocalStorage().nums.forEach((n) => {
    document.querySelector(`#num-${n}`).classList.add('selected');
  });
};
