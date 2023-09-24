const popMap = document.querySelector('.popup-map');
const popMapClose = document.querySelector('.popup-map__close');
const pop = document.querySelectorAll('[data-building]');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const svg = document.querySelector('.wid svg');
const wid = document.querySelector('.wid');
let popValues = [];
let scale = 0.7;
const mapBtn = document.querySelectorAll('.map-filters__btn');
const widt = document.documentElement.clientWidth;

let ar1 = [];
let ar2 = [];
hidd();


mapBtn.forEach(el => {
	if (el.dataset.filter.length <= 3) {
		ar1.push(el.dataset.filter.trim())
	}

	if (el.dataset.filter.length > 3) {
		el.dataset.filter.split(' ').forEach(elm => {
			ar1.push(elm);
		})

	}
})




pop.forEach(el => {
	ar1.forEach(elm => {
		if (el.dataset.building == elm) {
			ar2.push(el)
			el.parentNode.addEventListener('mouseover', e => {
				e.target.parentNode.querySelector('.fill').style.fill = '#dcdcdc';
				e.target.parentNode.querySelector('.fill').style.cursor = 'pointer';
			})
			el.parentNode.addEventListener('mouseout', e => {
				e.target.parentNode.querySelector('.fill').style.fill = '';
				e.target.parentNode.querySelector('.fill').style.cursor = 'auto';
			})
		}
	})
})





if (widt <= 500) {
	wid.scrollTop = 200;
	wid.scrollLeft = 500;
}



ar2.forEach(el => {
	el.addEventListener('click', function (e) {
		// el.dataset.building 
		hidd();
		show();
	});

});
popMapClose.addEventListener('click', function (e) {
	e.preventDefault();
	hidd();
});



document.querySelector('.map-filters__group').addEventListener('click', e => {
	let filterDataset = e.target.parentNode.dataset;
	let filterValues = [];
	hidd();

	if (e.target.parentNode.classList.contains('on')) {
		hidd();
		pop.forEach(el => {
			el.classList.remove('hv');
		})

		mapBtn.forEach(ele => {
			ele.classList.remove('on')
			ele.classList.remove('off')
		})
	} else {
		for (const key in filterDataset) {
			filterValues.push(filterDataset[key])
		}

		pop.forEach(path => {
			path.classList.remove('hv');
		})

		filterValues.forEach(elm => {
			if (elm.trim().length > 2) {

				elm.split(' ').forEach(it => {

					pop.forEach(el => {
						let popEl = el.dataset;
						if (popEl.building.trim().length > 2) {
							popEl.building.split(' ').forEach(ee => {
								if (ee == it) {
									el.classList.add('hv');

									mapBtn.forEach(ele => {
										if (ele == e.target.parentNode) {
											ele.classList.remove('off')
											ele.classList.add('on')
										} else {
											ele.classList.remove('on')
											ele.classList.add('off')
										}
									})

								}
							})
						} else {
							if (el.dataset.building == it) {
								el.classList.add('hv');
								mapBtn.forEach(ele => {
									if (ele == e.target.parentNode) {
										ele.classList.remove('off')
										ele.classList.add('on')
									} else {
										ele.classList.remove('on')
										ele.classList.add('off')
									}
								})

							}
						}
					})
				})
			} else {
				const building = document.querySelector(`[data-building="${elm.trim()}"]`);
				console.log(elm.trim());
				building.classList.add('hv');
				mapBtn.forEach(el => {
					if (el == e.target.parentNode) {
						el.classList.remove('off')
						el.classList.add('on')
					} else {
						el.classList.remove('on')
						el.classList.add('off')
					}
				})

			}

		})

	}

})


// ====
document.documentElement.addEventListener('click', (e) => {
	let bool = false;
	if (e.target.closest('.popup-map') || e.target.closest('.map-filters__group')) {
		return;
	}

	ar2.forEach(ite => {
		if (ite.dataset.building == e.target.dataset.building) {
			bool = true;
		}
	})
	if (bool) {
		return;
	}

	pop.forEach(el => {
		el.classList.remove('hv')
	})
	hidd();
	mapBtn.forEach(el => {
		el.classList.remove('on')
		el.classList.remove('off')
	})
})







plus.addEventListener('click', () => {
	if (scale.toFixed(2) <= 1.15) {
		scale += 0.15;
		svg.style.transform = `scale(${scale.toFixed(2)})`;
	}
})


minus.addEventListener('click', () => {
	if (scale.toFixed(2) >= 0.6) {
		scale += -0.15;
		svg.style.transform = `scale(${scale.toFixed(2)})`;
	}
})
// =====

function show() {
	popMap.classList.remove('hidd');
	popMap.classList.add('show');
}
function hidd() {
	popMap.classList.remove('show');
	popMap.classList.add('hidd');
}