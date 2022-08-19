class sClEntity {
    constructor(opt, callback) {

        this.root = document.querySelector(opt.root)
        this.id = opt.id


        this.nodes = {
            material: [],
            thick: [],
            facet: {
                items: [],
                mod: []
            },
            drilling: [],
            sandblast: [],
            membrane: {
                items: [],
                mod: {}
            },
            cutout: {
                parent: '',
                plus: '',
                minus: ''
            },
            glasses: [],
            cpu: '',
            clay: '',
            polishing: '',
            grinding: '',
            hardening: '',
            impregnation: '',
            printing: '',
            uv: ''
        }

        this.data = {
            material: 0,
            thick: 0,
            facet: {
                item: 0,
                mod: {}
            },
            drilling: 0,
            sandblast: 0,
            membrane: {
                item: 0,
                mod: {}
            },
            cutout: 1,
            processingResult: 0,
            entityResult: 0,
            cpu: 0,
            clay: 0,
            polishing: false,
            grinding: false,
            hardening: false,
            impregnation: false,
            printing: false,
            uv: false
        }

        this.scl = {}
        this.scl.callback = callback

        this.initGlassesBlock()
        this.registerRadios()
        this.registerInps()
        this.registerCounters()
        this.registerCheckboxes()

    }

    // glases block (количество стекл)
    initGlassesBlock(state, callback) {
        const _glasses = this.nodes.glasses
        const _glassesRoot = this.root.querySelector('[data-calcui=glasses]')
        _glassesRoot.innerHTML = ''

        const addGlass = (id) => {
            const render = (id) => {
                const template = `
                    <div class="inner-block__subtitle">
                        <span class="inner-block__subtitle-text">Стекло №${id + 1}</span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                fill="black" fill-opacity="0.5" />
                            <path
                                d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                fill="black" fill-opacity="0.5" />
                        </svg>
                        <div class="inner-block__subtitle-aside">
                            <span data-calcui-glass-out="square" class="calcui-text-smaller">0.00 м2</span>
                            <span data-calcui-glass-out="perimeter" class="calcui-text-smaller">0.00 п. м.</span>
                        </div>
                    </div>
                    <div class="calcui-quant__row">
                        <div class="calcui-quant__inps">
                            <input data-calcui-inp="width" type="number" class="calcui-inp" placeholder="Ширина (мм)">
                            <input data-calcui-inp="height" type="number" class="calcui-inp" placeholder="Высота (мм)">
                            <div data-calcui-inp="quant" class="calcui-inp-counter">
                                <button class="calcui-inp-counter__btn">
                                    <svg width="14" height="3" viewBox="0 0 14 3" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1.5H1" stroke="#222222" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </button>
                                <span class="calcui-inp-counter__outer">1шт</span>
                                <button class="calcui-inp-counter__btn">
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 1.5V7.5M7 7.5V13.5M7 7.5H13M7 7.5H1" stroke="#222222"
                                            stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                        <div class="calcui-quant__checkboxes">
                            <div class="calcui-checkbox__block">
                                <input data-calcui-inp="radius" type="checkbox" id="cg${this.id}${id}1"
                                    class="calcui-checkbox calcui-checkbox__light">
                                <label for="cg${this.id}${id}1" class="calcui-checkbox__btn"></label>
                                <span class="calcui-checkbox__text">Радиус</span>
                                <svg class="calcui-checkbox__icon" width="18" height="18"
                                    viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                        fill="black" fill-opacity="0.5" />
                                    <path
                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                        fill="black" fill-opacity="0.5" />
                                </svg>
                            </div>
                            <div class="calcui-checkbox__block">
                                <input data-calcui-inp="diameter" type="checkbox" id="cg${this.id}${id}2"
                                    class="calcui-checkbox calcui-checkbox__light">
                                <label for="cg${this.id}${id}2" class="calcui-checkbox__btn"></label>
                                <span class="calcui-checkbox__text">Диаметр</span>
                                <svg class="calcui-checkbox__icon" width="18" height="18"
                                    viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                        fill="black" fill-opacity="0.5" />
                                    <path
                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                        fill="black" fill-opacity="0.5" />
                                </svg>
                            </div>

                        </div>
                        <div class="calcui-quant__delete">
                            <button data-calcui-action="delete" class="calcui-quant__delete-btn">
                                <svg width="15" height="3" viewBox="0 0 15 3" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 1.5H1.5" stroke="#EB5757" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>`
                const ctc = document.createElement('div')
                ctc.classList.add('calcui-quant')
                ctc.innerHTML = template

                _glassesRoot.append(ctc)
                return ctc
            }

            const dynamicBinding = (glass) => {

                const updateSquareAndPerimeter = () => {
                    const sNode = glass.el.querySelector('[data-calcui-glass-out="square"]')
                    const pNode = glass.el.querySelector('[data-calcui-glass-out="perimeter"]')

                    glass.data.square = (glass.data.width * glass.data.height) / 1000000
                    glass.data.perimeter = (glass.data.width * 2 + glass.data.height * 2) / 1000

                    glass.data.square = Math.floor(glass.data.square * 100) / 100
                    glass.data.perimeter = Math.floor(glass.data.perimeter * 100) / 100

                    let s = glass.data.square
                    let p = glass.data.perimeter

                    if (s === 0) {
                        s = '0.00'
                    }

                    if (p === 0) {
                        p = '0.00'
                    }

                    sNode.textContent = s + ' м2'
                    pNode.textContent = p + ' п. м.'
                }

                const width = glass.el.querySelector('[data-calcui-inp="width"]')
                const height = glass.el.querySelector('[data-calcui-inp="height"]')
                const quant = glass.el.querySelector('[data-calcui-inp="quant"]')
                const quantMinus = quant.querySelectorAll('.calcui-inp-counter__btn')[0]
                const quantPlus = quant.querySelectorAll('.calcui-inp-counter__btn')[1]
                const radius = glass.el.querySelector(`input#cg${this.id}${_id}1`)
                const diameter = glass.el.querySelector(`input#cg${this.id}${_id}2`)
                const deleteGlass = glass.el.querySelector('[data-calcui-action="delete"]')

                width.addEventListener('input', () => {
                    let w = parseFloat(width.value, 10)
                    if (Number.isInteger(w) && !isNaN(w)) {
                        glass.data.width = w
                    } else {
                        glass.data.width = 0
                    }
                    this.observe('glass')
                    updateSquareAndPerimeter()
                    sumSquareAndPerimeter()
                })

                height.addEventListener('input', () => {
                    let h = parseFloat(height.value, 10)
                    if (Number.isInteger(h) && !isNaN(h)) {
                        glass.data.height = h
                    } else {
                        glass.data.height = 0
                    }
                    this.observe('glass')
                    updateSquareAndPerimeter()
                    sumSquareAndPerimeter()
                })

                quantMinus.addEventListener('click', () => {
                    if (glass.data.quant === 1) {
                        return false
                    }

                    glass.data.quant = glass.data.quant - 1

                    const out = quant.querySelector('.calcui-inp-counter__outer')
                    out.textContent = glass.data.quant + 'шт'
                    this.observe('glass')
                })

                quantPlus.addEventListener('click', () => {
                    // if (glass.data.quant === 1) {
                    //     return false
                    // }

                    glass.data.quant = glass.data.quant + 1

                    const out = quant.querySelector('.calcui-inp-counter__outer')
                    out.textContent = glass.data.quant + 'шт'
                    this.observe('glass')
                })

                radius.addEventListener('input', () => {
                    glass.data.radius = radius.checked
                    this.observe('glass')
                })

                diameter.addEventListener('input', () => {
                    glass.data.diameter = diameter.checked
                    this.observe('glass')
                })

                deleteGlass.onclick = () => {
                    if (this.nodes.glasses.length > 1) {
                        glass.el.remove()
                        this.nodes.glasses = this.nodes.glasses.filter(item => item.id !== glass.id)
                        updateIds()
                        this.observe('glass')
                    }
                }
            }

            let _ids = []
            if (this.nodes.glasses.length > 0) {
                this.nodes.glasses.forEach(item => {
                    _ids.push(item.id)
                })
            }

            let _id = _ids.length === 0 ? 0 : Math.max.apply(null, _ids) + 1;
            const newGlass = render(_id)
            this.nodes.glasses.push({
                id: _id,
                el: newGlass,
                data: {
                    width: 0,
                    height: 0,
                    quant: 1,
                    radius: false,
                    diameter: false,
                    square: 0,
                    perimeter: 0,
                }
            })

            this.observe('glass')

            dynamicBinding(this.nodes.glasses[this.nodes.glasses.length - 1])
        }

        const updateIds = () => {
            this.nodes.glasses.forEach((item, index) => {
                item.id = index
            })

            const _glasses = _glassesRoot.querySelectorAll('.calcui-quant')
            _glasses.forEach((item, index) => {
                const t = item.querySelector('.inner-block__subtitle-text')
                t.innerHTML = `Стекло №${index + 1}`
            })
        }

        const sumSquareAndPerimeter = () => {
            const sNode = this.root.querySelector('[data-calcui-glass-out="summS"]')
            const pNode = this.root.querySelector('[data-calcui-glass-out="summP"]')
            let s = 0
            let p = 0

            this.nodes.glasses.forEach(item => {
                s = s + (item.data.width * item.data.height) / 1000000
                p = p + (item.data.width * 2 + item.data.height * 2) / 1000
            })

            s = Math.floor(s * 100) / 100
            p = Math.floor(p * 100) / 100

            if (s === 0) {
                s = '0.00'
            }

            if (p === 0) {
                p = '0.00'
            }

            sNode.textContent = 'Общая площадь: ' + s + ' м2'
            pNode.textContent = 'Общий периметр: ' + p + ' п. м.'
        }

        addGlass()
        updateIds()

        // add glasses
        const addGlassBtn = this.root.querySelector('[data-calcui-action=addGlass]')
        addGlassBtn.addEventListener('click', () => {
            addGlass()
            updateIds()
        })
    }

    registerRadios() {
        const toggle = (obj, list) => {
            obj.isActive = !obj.isActive
            // radio func
            list.forEach(item => {
                if (obj.id !== item.id) {
                    item.isActive = false
                }
            })

            // state binding
            list.forEach((item) => {
                if (!item.isActive) {
                    item.el.classList.remove('--active')
                }
            })

            // style presentation
            if (obj.isActive) {
                obj.el.classList.add('--active')

            } else {
                obj.el.classList.remove('--active')
            }
        }

        const pushItemsToArray = (arr, key, selector, complex = false) => {
            if (complex) {
                Array.from(document.querySelectorAll(`[data-calcui-entity="${this.id + 1}"] ${selector}`)).forEach((el, index) => {
                    arr.push({
                        id: index,
                        isActive: false,
                        el: el,
                        value: () => {
                            if (el.getAttribute('data-calcui-value-named') !== null) {
                                return el.getAttribute('data-calcui-value')
                            }
                            return parseInt(el.getAttribute('data-calcui-value'), 10) || 0
                        },
                        bind: () => { this.observe(key) }
                    })
                })

            } else {
                Array.from(document.querySelector(`[data-calcui-entity="${this.id + 1}"] ${selector}`).children).forEach((el, index) => {
                    arr.push({
                        id: index,
                        isActive: false,
                        el: el,
                        value: () => {
                            if (el.getAttribute('data-calcui-value-named') !== null) {
                                return el.getAttribute('data-calcui-value')
                            }
                            return parseInt(el.getAttribute('data-calcui-value'), 10) || 0
                        },
                        bind: () => { this.observe(key) }
                    })
                })
            }

            arr.forEach((obj) => {
                obj.el.addEventListener('click', () => {
                    toggle(obj, arr)
                    obj.bind()
                })
            })
        }

        pushItemsToArray(this.nodes.material, 'material', '[data-calcui="material"]')
        pushItemsToArray(this.nodes.thick, 'thick', '[data-calcui="thick"]')
        pushItemsToArray(this.nodes.facet.items, 'facet', '[data-calcui="facet"] .calcui-radio', true)
        pushItemsToArray(this.nodes.drilling, 'drilling', '[data-calcui="drilling"]')
        pushItemsToArray(this.nodes.sandblast, 'sandblast', '[data-calcui="sandblast"]')
        pushItemsToArray(this.nodes.membrane.items, 'membrane', '[data-calcui="membrane"] .calcui-radio', true)
    }

    registerInps() {
        this.nodes.cpu = this.root.querySelector('[data-calcui="cpu"]')
        this.nodes.clay = this.root.querySelector('[data-calcui="clay"]')

        this.nodes.cpu.addEventListener('input', () => {
            let value = parseFloat(this.nodes.cpu.value, 10)
            if (Number.isInteger(value) && !isNaN(value)) {
                this.data.cpu = value
            } else {
                this.data.cpu = 0
            }
            this.observe('cpu')
        })

        this.nodes.clay.addEventListener('input', () => {
            let value = parseFloat(this.nodes.cpu.value, 10)
            if (Number.isInteger(value) && !isNaN(value)) {
                this.data.clay = value
            } else {
                this.data.clay = 0
            }
            this.observe('clay')
        })
    }

    registerCounters() {
        this.nodes.cutout.parent = this.root.querySelector('[data-calcui-inp="cutout"]')
        this.nodes.cutout.minus = this.nodes.cutout.parent.querySelectorAll('.calcui-inp-counter__btn')[0]
        this.nodes.cutout.plus = this.nodes.cutout.parent.querySelectorAll('.calcui-inp-counter__btn')[1]

        this.nodes.cutout.minus.addEventListener('click', () => {
            if (this.data.cutout === 1) {
                return false
            }
            this.data.cutout = this.data.cutout - 1

            const out = this.nodes.cutout.parent.querySelector('.calcui-inp-counter__outer')
            out.textContent = this.data.cutout + 'шт'
            this.observe('cutout')
        })

        this.nodes.cutout.plus.addEventListener('click', () => {
            // if (this.data.cutout === 1) {
            //     return false
            // }
            this.data.cutout = this.data.cutout + 1

            const out = this.nodes.cutout.parent.querySelector('.calcui-inp-counter__outer')
            out.textContent = this.data.cutout + 'шт'
            this.observe('cutout')
        })
    }

    registerCheckboxes() {
        this.nodes.polishing = this.root.querySelector('[data-calcui="polishing"]')
        this.nodes.grinding = this.root.querySelector('[data-calcui="grinding"]')
        this.nodes.hardening = this.root.querySelector('[data-calcui="hardening"]')
        this.nodes.impregnation = this.root.querySelector('[data-calcui="impregnation"]')
        this.nodes.printing = this.root.querySelector('[data-calcui="printing"]')
        this.nodes.uv = this.root.querySelector('[data-calcui="uv"]')

        const init = (checkbox, key) => {
            checkbox.addEventListener('input', () => {
                this.data[key] = checkbox.checked
                this.observe(key)
            })
        }

        init(this.nodes.polishing, 'polishing')
        init(this.nodes.grinding, 'grinding')
        init(this.nodes.hardening, 'hardening')
        init(this.nodes.impregnation, 'impregnation')
        init(this.nodes.printing, 'printing')
        init(this.nodes.uv, 'uv')

    }

    observe(type) {
        switch (type) {
            case 'material': // material cost @int
                this.nodes.material.forEach(item => {
                    if (item.isActive) {
                        this.data.material = item.value()
                    }
                })
                this.scl.callback()
                break;
            case 'thick': // thick cost @int
                this.nodes.thick.forEach(item => {
                    if (item.isActive) {
                        this.data.thick = item.value()
                    }
                })
                this.scl.callback()
                break;
            case 'facet': // facet cost @int
                this.nodes.facet.items.forEach(item => {
                    if (item.isActive) {
                        this.data.facet.item = item.value()
                    }
                })
                this.scl.callback()
                break;
            case 'glass': // glass cost @arr
                this.data.glasses = []
                this.nodes.glasses.forEach(glass => {
                    this.data.glasses.push({
                        id: glass.id,
                        data: glass.data
                    })
                })
                this.scl.callback()
                break;
            case 'drilling': // drilling cost @int
                this.nodes.drilling.forEach(item => {
                    if (item.isActive) {
                        this.data.drilling = item.value()
                    }
                })
                this.scl.callback()
                break;
            case 'sandblast': // sandblast cost @int
                this.nodes.sandblast.forEach(item => {
                    if (item.isActive) {
                        this.data.sandblast = item.value()
                    }
                })
                this.scl.callback()
                break;
            case 'membrane': // sandblast cost @int
                this.nodes.membrane.items.forEach(item => {
                    if (item.isActive) {
                        this.data.membrane.item = item.value()
                    }
                })
                this.scl.callback()
                break;
            case 'cpu': 
                this.scl.callback()
                break;
            case 'clay': 
                this.scl.callback()
                break;
            case 'cutout': 
                this.scl.callback()
                break;
            case 'polishing':
                this.scl.callback()
                break;
            case 'grinding':
                this.scl.callback()
                break;
            case 'hardening':
                this.scl.callback()
                break;
            case 'impregnation':
                this.scl.callback()
                break;
            case 'printing':
                this.scl.callback()
                break;
            case 'uv':
                this.scl.callback()
                break;
            default:
                this.scl.callback()
                break;
        }
    }

    getData() {
        return this.data
    }
}


// Главный класс обработчика который получает с каждой обработки данные считает их и отображает
class sCl {
    constructor() {
        this.entity = [] // Обработки
        this.data = [] // Данные об обработках

        this.nodes = {
            root: document.querySelector('[data-calcui="calcui-root-ctc"]'),
            list: document.querySelector('[data-calcui-main=out]'),
            listWrapper: document.querySelector('[data-calcui-main=out]'),
            newGlass: document.querySelector('[data-calcui-action=newglass]')
        }

        this.addEntity()


        this.nodes.newGlass.addEventListener('click', () => {
            this.addEntity(false)
        })
    }

    addEntity(isFirst = true) {
        if (isFirst) {
            this.entity.push(
                {
                    id: 0,
                    _ref: new sClEntity({ root: '[data-calcui-entity="1"]', id: 0 }, () => { this.cost() }),
                    sum: 0
                },
            )
        } else {
            const _id = this.entity[this.entity.length - 1].id + 1
            const renderEntity = (id) => {
                const template = `
                    <div class="place-block__header dropdown__label">
                        <p class="place-block__title">Обработка стекла №${id + 1}</p>
                        <div class="place-block__header-state dropdown__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 15L12 8L19 15" stroke="#222222" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
        
                    <div class="place-block__body dropdown__body">
                        <div class="place-block__body-wrapper">
                            <div class="inner-block">
                                <div class="inner-block__single">
                                    <div class="inner-block__subtitle">
                                        <span class="inner-block__subtitle-text">Материал стекла</span>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                fill="black" fill-opacity="0.5" />
                                            <path
                                                d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                fill="black" fill-opacity="0.5" />
                                        </svg>
                                    </div>
                                    <div data-calcui="material" class="inner-block__items-row">
                                        <div data-calcui-value="100" class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Бесцветное</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Бронзовое</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Серое</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Clear Vision</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Matelux (Бесцветное)</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Lacobel Clear Float</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Matelux (Бронзовое, Серое)</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Lacobel 9003,1013</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">Lacobel 7013,7016,7000,8615,8715,8815</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="currenColor"
                                                    class="caclui-radio__icon" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z" />
                                                </svg>
                                                <span class="calcui-radio__text">FLUTES</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="inner-block__single">
                                    <div class="inner-block__subtitle">
                                        <span class="inner-block__subtitle-text">Толщина</span>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                fill="black" fill-opacity="0.5" />
                                            <path
                                                d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                fill="black" fill-opacity="0.5" />
                                        </svg>
                                    </div>
                                    <div data-calcui="thick" class="inner-block__items-row">
                                        <div data-calcui-value="100" class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">4мм</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">5мм</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">6мм</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">8мм</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">10мм</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="inner-block__single">
                                    <div class="inner-block__title">
                                        <span class="inner-block__title-text">Стекла</span>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                fill="black" fill-opacity="0.5" />
                                            <path
                                                d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                fill="black" fill-opacity="0.5" />
                                        </svg>
                                    </div>
                                    <div data-calcui="glasses" class="inner-block__ladder-wrapper">
                                    </div>
                                    <div class="calcui-quant__nav">
                                        <div class="calcui-quant__nav-info">
                                            <span data-calcui-glass-out="summS"
                                                class="calcui-text-smaller calcui-quant__nav-text">Общая площадь: 0.00 м2</span>
                                            <span data-calcui-glass-out="summP"
                                                class="calcui-text-smaller calcui-quant__nav-text">Общий периметр: 0.00 п.
                                                м.</span>
                                        </div>
                                        <span data-calcui-action="addGlass" class="calcui-btn">
                                            <svg class="calcui-btn-icon" width="16" height="17" viewBox="0 0 16 17" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.5 0.75V16.25" stroke="white" stroke-width="2" />
                                                <path d="M15.5 8.75L0 8.75" stroke="white" stroke-width="2" />
                                            </svg>
                                            <span class="calcui-btn-text">Добавить стекло</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-block">
                                <div class="inner-block__single">
                                    <div class="inner-block__subtitle">
                                        <span class="inner-block__subtitle-text">Фацет п.м</span>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                fill="black" fill-opacity="0.5" />
                                            <path
                                                d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                fill="black" fill-opacity="0.5" />
                                        </svg>
                                        <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                    </div>
                                    <div data-calcui="facet" class="">
                                        <div class="inner-block__items-row">
                                            <div data-calcui-value="100" class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text">Без фацепта</span>
                                                </div>
                                            </div>
                                            <div class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text">10мм</span>
                                                </div>
                                            </div>
                                            <div class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text">15мм</span>
                                                </div>
                                            </div>
                                            <div class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text">20мм</span>
                                                </div>
                                            </div>
                                            <div class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text">25мм</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="inner-block__checkboxes-row">
                                            <div class="calcui-checkbox__block">
                                                <input type="checkbox" id="cf${id}1" class="calcui-checkbox calcui-checkbox__light">
                                                <label for="cf${id}1" class="calcui-checkbox__btn"></label>
                                                <span class="calcui-checkbox__text">Полировка п.м</span>
                                                <svg class="calcui-checkbox__icon" width="18" height="18" viewBox="0 0 22 22"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div class="calcui-checkbox__block">
                                                <input type="checkbox" id="cf${id}2" class="calcui-checkbox calcui-checkbox__light">
                                                <label for="cf${id}2" class="calcui-checkbox__btn"></label>
                                                <span class="calcui-checkbox__text">Шлифовка п.м</span>
                                                <svg class="calcui-checkbox__icon" width="18" height="18" viewBox="0 0 22 22"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div class="calcui-checkbox__block">
                                                <input type="checkbox" id="cf${id}3" class="calcui-checkbox calcui-checkbox__light">
                                                <label for="cf${id}3" class="calcui-checkbox__btn"></label>
                                                <span class="calcui-checkbox__text">Закалка кв.м</span>
                                                <svg class="calcui-checkbox__icon" width="18" height="18" viewBox="0 0 22 22"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                        </div>
                                    </div>
            
                                </div>
                            </div>
                            <div class="inner-block">
                                <div class="inner-block__grid-wrapper">
                                    <div class="inner-block__col">
                                        <div class="inner-block__single">
                                            <div class="inner-block__subtitle">
                                                <span class="inner-block__subtitle-text">ЧПУ резка п.м</span>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div class="inner-block__inp">
                                                <input type="number" class="calcui-inp" placeholder="Длинна резки (мм)">
                                            </div>
                                        </div>
                                        <div class="inner-block__single">
                                            <div class="inner-block__subtitle">
                                                <span class="inner-block__subtitle-text">Склеивание п.м</span>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div class="inner-block__inp">
                                                <input type="number" class="calcui-inp" placeholder="Длинна склейки (мм)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inner-block__col">
                                        <div class="inner-block__single">
                                            <div class="inner-block__subtitle">
                                                <span class="inner-block__subtitle-text">Сверление</span>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div data-calcui="drilling" class="inner-block__items-row">
                                                <div data-calcui-value="100" class="calcui-radio">
                                                    <div class="calcui-radio__inner">
                                                        <span class="calcui-radio__text">меньше 20мм</span>
                                                    </div>
                                                </div>
                                                <div class="calcui-radio">
                                                    <div class="calcui-radio__inner">
                                                        <span class="calcui-radio__text">больше 20мм</span>
                                                    </div>
                                                </div>
                                                <div class="calcui-radio">
                                                    <div class="calcui-radio__inner">
                                                        <span class="calcui-radio__text">больше 35мм</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="inner-block__single">
                                            <div class="inner-block__subtitle">
                                                <span class="inner-block__subtitle-text">Вырезы в стекле</span>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div class="inner-block__inp">
                                                <div class="calcui-inp-counter">
                                                    <button class="calcui-inp-counter__btn">
                                                        <svg width="14" height="3" viewBox="0 0 14 3" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13 1.5H1" stroke="#222222" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
            
                                                    </button>
                                                    <span class="calcui-inp-counter__outer">1шт</span>
                                                    <button class="calcui-inp-counter__btn">
                                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7 1.5V7.5M7 7.5V13.5M7 7.5H13M7 7.5H1" stroke="#222222"
                                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
            
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-block">
                                <div class="inner-block__single">
                                    <div class="inner-block__subtitle">
                                        <span class="inner-block__subtitle-text">Пескоструй</span>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                fill="black" fill-opacity="0.5" />
                                            <path
                                                d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                fill="black" fill-opacity="0.5" />
                                        </svg>
                                        <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                    </div>
                                    <div data-calcui="sandblast" class="inner-block__items-row">
                                        <div data-calcui-value="100" class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">Без пескоструя</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">Рисунок (1700р м2)</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">Сплошное матирование (800р м2)</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">Двухсторонее матирование (3300р м2)</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">Пропитка (антипальчиковое покрытие) (300р
                                                    м2)</span>
                                            </div>
                                        </div>
                                        <div class="calcui-radio">
                                            <div class="calcui-radio__inner">
                                                <span class="calcui-radio__text-normal">Рисунок с покраской в цвет (2400р м2)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                <div class="inner-block__single">
                                    <div class="inner-block__subtitle">
                                        <span class="inner-block__subtitle-text">Пленочное покрытие</span>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                fill="black" fill-opacity="0.5" />
                                            <path
                                                d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                fill="black" fill-opacity="0.5" />
                                        </svg>
                                        <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                    </div>
                                    <div data-calcui="membrane" class="">
                                        <div class="inner-block__items-row">
                                            <div data-calcui-value="100" class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text-normal">Без пленочного покрытия</span>
                                                </div>
                                            </div>
                                            <div class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text-normal">Пленка матовая (1500р м2)</span>
                                                </div>
                                            </div>
                                            <div class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text-normal">15мм</span>
                                                </div>
                                            </div>
                                            <div class="calcui-radio">
                                                <div class="calcui-radio__inner">
                                                    <span class="calcui-radio__text-normal">20мм</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="inner-block__checkboxes-row">
                                            <div class="calcui-checkbox__block">
                                                <input type="checkbox" id="cm${id}1" class="calcui-checkbox calcui-checkbox__light">
                                                <label for="cm${id}1" class="calcui-checkbox__btn"></label>
                                                <span class="calcui-checkbox__text">Пропитка кв.м</span>
                                                <svg class="calcui-checkbox__icon" width="18" height="18" viewBox="0 0 22 22"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div class="calcui-checkbox__block">
                                                <input type="checkbox" id="cm${id}2" class="calcui-checkbox calcui-checkbox__light">
                                                <label for="cm${id}2" class="calcui-checkbox__btn"></label>
                                                <span class="calcui-checkbox__text">Фотопечать кв.м</span>
                                                <svg class="calcui-checkbox__icon" width="18" height="18" viewBox="0 0 22 22"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                            <div class="calcui-checkbox__block">
                                                <input type="checkbox" id="cm${id}3" class="calcui-checkbox calcui-checkbox__light">
                                                <label for="cm${id}3" class="calcui-checkbox__btn"></label>
                                                <span class="calcui-checkbox__text">УФ печать кв.м</span>
                                                <svg class="calcui-checkbox__icon" width="18" height="18" viewBox="0 0 22 22"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 1.375C5.68477 1.375 1.375 5.68477 1.375 11C1.375 16.3152 5.68477 20.625 11 20.625C16.3152 20.625 20.625 16.3152 20.625 11C20.625 5.68477 16.3152 1.375 11 1.375ZM11 18.9922C6.58711 18.9922 3.00781 15.4129 3.00781 11C3.00781 6.58711 6.58711 3.00781 11 3.00781C15.4129 3.00781 18.9922 6.58711 18.9922 11C18.9922 15.4129 15.4129 18.9922 11 18.9922Z"
                                                        fill="black" fill-opacity="0.5" />
                                                    <path
                                                        d="M13.3977 6.8041C12.7531 6.23906 11.9023 5.92969 11 5.92969C10.0977 5.92969 9.24687 6.24121 8.60234 6.8041C7.93203 7.39063 7.5625 8.1791 7.5625 9.02344V9.18672C7.5625 9.28125 7.63984 9.35859 7.73437 9.35859H8.76562C8.86016 9.35859 8.9375 9.28125 8.9375 9.18672V9.02344C8.9375 8.07598 9.86348 7.30469 11 7.30469C12.1365 7.30469 13.0625 8.07598 13.0625 9.02344C13.0625 9.6916 12.5898 10.3039 11.8572 10.5854C11.4018 10.7594 11.015 11.0645 10.7379 11.4641C10.4564 11.8723 10.3104 12.3621 10.3104 12.8584V13.3203C10.3104 13.4148 10.3877 13.4922 10.4822 13.4922H11.5135C11.608 13.4922 11.6854 13.4148 11.6854 13.3203V12.8326C11.6865 12.624 11.7504 12.4207 11.8688 12.249C11.9872 12.0773 12.1547 11.9453 12.3492 11.8701C13.6168 11.3824 14.4354 10.2652 14.4354 9.02344C14.4375 8.1791 14.068 7.39063 13.3977 6.8041ZM10.1406 15.7266C10.1406 15.9545 10.2312 16.1731 10.3923 16.3342C10.5535 16.4954 10.7721 16.5859 11 16.5859C11.2279 16.5859 11.4465 16.4954 11.6077 16.3342C11.7688 16.1731 11.8594 15.9545 11.8594 15.7266C11.8594 15.4986 11.7688 15.2801 11.6077 15.1189C11.4465 14.9577 11.2279 14.8672 11 14.8672C10.7721 14.8672 10.5535 14.9577 10.3923 15.1189C10.2312 15.2801 10.1406 15.4986 10.1406 15.7266Z"
                                                        fill="black" fill-opacity="0.5" />
                                                </svg>
                                                <span class="calcui-text-smaller calcui-cost">+100 руб.</span>
                                            </div>
                                        </div>
                                    </div>
            
                                </div>
                            </div>
                        </div>
                    </div>
                `

                const wrapper = document.createElement('div')
                wrapper.classList.add('place-block')
                wrapper.classList.add('dropdown__item')
                wrapper.classList.add('dropdown__item--active')
                wrapper.setAttribute('data-calcui-entity', `${id + 1}`)
                wrapper.setAttribute('data-dropdown-item', '')

                wrapper.innerHTML = template
                this.nodes.root.insertBefore(wrapper, this.nodes.newGlass)
            }

            renderEntity(_id)
            window.revokeDropdown()

            this.entity.push(
                {
                    id: _id,
                    _ref: new sClEntity({ root: `[data-calcui-entity="${_id + 1}"]`, id: _id }, () => { this.cost() }),
                    sum: 0
                }
            )

            this.cost()
        }
    }

    cost() {
        this.data = []
        this.entity.forEach((ent, index) => {
            this.data.push(ent._ref.getData())
            console.log(this.data)

        })

        this.renderList()
    }

    calcGlass(d) {
        const squareMultiplayer = 900
        let squares = (d.width * d.height) / 1000000
        return squares * squareMultiplayer
    }

    calcMisc(entityData) {
        let sumAll = 0

        let facet = 0
        let cpu = 0
        let clay = 0
        let drilling = 0
        let cutout = 0
        let sandblast = 0
        let membrane = 0

        entityData.glasses.forEach(glass => {
            facet += Math.floor(entityData.facet.item * (glass.data.width * 2 + glass.data.height * 2) / 1000)
        })





        sumAll = facet + cpu + clay + drilling + cutout + sandblast + membrane
        return sumAll
    }

    calcEntity(entityData) {
        let sumAll = 0
        let glassSum = 0
        let miscSum = 0

        entityData.glasses.forEach(glass => {
            glassSum += this.calcGlass(glass.data)
        })

        miscSum = this.calcMisc(entityData)

        sumAll = glassSum + miscSum
        return sumAll
    }

    calcAll(en) {
        
    }

    // Render table with detailing info
    renderList() {
        if (this.data[0]) {
            this.nodes.listWrapper.innerHTML = ''
            this.data.forEach((el, index) => {
                const block = document.createElement('div')
                block.classList.add('place-block-cost__list-block')
                block.innerHTML += `
                    <div class="place-block-cost__list-title-row">
                        <p class="place-block-cost__list-title">Обработка №${index + 1}</p>
                        <span class="place-block-cost__list-value">${this.calcEntity(el)} р.</span>
                    </div>
                `
                
                const body = document.createElement('div')
                body.classList.add('place-block-cost__list-body')

                el.glasses.forEach(el => {
                    body.innerHTML += `
                        <div class="place-block-cost__list-item">
                            <p class="place-block-cost__list-item-text">Стекло (${el.data.width}х${el.data.height}мм)</p>
                            <span class="place-block-cost__list-value">${this.calcGlass(el.data)} р.</span>
                        </div>
                    `
                })
                
                body.innerHTML +=`
                    <div class="place-block-cost__list-item">
                        <p class="place-block-cost__list-item-text">Действия над стеклами</p>
                        <span class="place-block-cost__list-value">${this.calcMisc(el)} р.</span>
                    </div>
                `

                block.append(body)
                this.nodes.listWrapper.append(block)
            })
        }
    }
}


function revokeDropdown() {
    // dropdown
    const dropdownItems = document.querySelectorAll('[data-dropdown-item]')
    dropdownItems.forEach((item) => {
        let heightBody = item.children[1].children[0].offsetHeight
        item.style.setProperty('--innerHeight', `${heightBody}px`)

        if (item.classList.contains('dropdown__item--active'))
            item.children[1].style.height = `${heightBody}px`
        else
            item.children[1].style.height = '0px'

        item.children[0].onclick = () => {
            item.classList.toggle('dropdown__item--active')

            if (item.classList.contains('dropdown__item--active'))
                item.children[1].style.height = `${heightBody}px`
            else
                item.children[1].style.height = '0px'

        }
    })
}


window.addEventListener('load', () => { 
    const calc = new sCl()
    window.revokeDropdown()
})