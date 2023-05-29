function getCustomProperty(ele, prop) {
  return parseFloat(getComputedStyle(ele).getPropertyValue(prop));
}

function setCustomProperty(ele, prop, val) {
  ele.style.setProperty(prop, val);
}

function incrementCustomProperty(ele, prop, inc) {
  setCustomProperty(ele, prop, getCustomProperty(ele, prop) + inc);
}

export { getCustomProperty, setCustomProperty, incrementCustomProperty };
