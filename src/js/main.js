class sClEntity {
    constructor(opt, callback) {

        this.root = document.querySelector(opt.root)
        this.id = opt.id


        this.nodes = {
            material: [],
            thick: [],
            facet: [],
            drilling: [],
            sandblast: [],
            membrane: [],
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
            thick: 900,
            facet: 0,
            drilling: 0,
            sandblast: 0,
            membrane: 0,
            cutout: 0,
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
                        <svg data-tooltip="Стекло №${id + 1}" width="22" height="22" viewBox="0 0 22 22" fill="none"
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
                                <svg data-tooltip="Радиус" class="calcui-checkbox__icon" width="18" height="18"
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
                                <svg data-tooltip="Диаметр" class="calcui-checkbox__icon" width="18" height="18"
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

                    glass.data.square = ((glass.data.width * glass.data.height) / 1000000) * glass.data.quant
                    glass.data.perimeter = ((glass.data.width * 2 + glass.data.height * 2) / 1000) * glass.data.quant

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
                    updateSquareAndPerimeter()
                    sumSquareAndPerimeter()
                })

                quantPlus.addEventListener('click', () => {
                    // if (glass.data.quant === 1) {
                    //     return false
                    // }

                    glass.data.quant = glass.data.quant + 1

                    const out = quant.querySelector('.calcui-inp-counter__outer')
                    out.textContent = glass.data.quant + 'шт'
                    this.observe('glass')
                    updateSquareAndPerimeter()
                    sumSquareAndPerimeter()
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
                s = s + ((item.data.width * item.data.height) / 1000000) * item.data.quant
                p = p + ((item.data.width * 2 + item.data.height * 2) / 1000) * item.data.quant
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
            window.revokeDropdown()
            window.revokeTooltip()
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

        const pushItemsToArray = (arr, key, selector) => {
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

            arr.forEach((obj) => {
                obj.el.addEventListener('click', () => {
                    toggle(obj, arr)
                    obj.bind()
                })
            })
        }

        pushItemsToArray(this.nodes.material, 'material', '[data-calcui="material"]')
        pushItemsToArray(this.nodes.thick, 'thick', '[data-calcui="thick"]')
        pushItemsToArray(this.nodes.facet, 'facet', '[data-calcui="facet"]')
        pushItemsToArray(this.nodes.drilling, 'drilling', '[data-calcui="drilling"]')
        pushItemsToArray(this.nodes.sandblast, 'sandblast', '[data-calcui="sandblast"]')
        pushItemsToArray(this.nodes.membrane, 'membrane', '[data-calcui="membrane"]')
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
            let value = parseFloat(this.nodes.clay.value, 10)
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
            if (this.data.cutout === 0) {
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
                this.nodes.facet.forEach(item => {
                    if (item.isActive) {
                        this.data.facet = item.value()
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
                this.nodes.membrane.forEach(item => {
                    if (item.isActive) {
                        this.data.membrane = item.value()
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

        this.mods = {
            measure: false,
            delivery: false,
            assembling: false,
            sale: 0
        }

        this.nodes = {
            root: document.querySelector('[data-calcui="calcui-root-ctc"]'),
            list: document.querySelector('[data-calcui-main=out]'),
            listWrapper: document.querySelector('[data-calcui-main=out]'),
            newGlass: document.querySelector('[data-calcui-action=newglass]'),
            measure: document.querySelector('[data-calcui-scl=measure]'),
            delivery: document.querySelector('[data-calcui-scl=delivery]'),
            assembling: document.querySelector('[data-calcui-scl=assembling]'),
            sale: document.querySelector('[data-calcui="sale"]'),
            send: document.querySelector('[data-calcui-send]'),
        }

        this.addEntity()

        this.nodes.newGlass.addEventListener('click', () => {
            this.addEntity(false)
        })


        this.nodes.measure.oninput = () => {
            this.mods.measure = this.nodes.measure.checked
            this.cost()
        }
        this.nodes.delivery.oninput = () => {
            this.mods.delivery = this.nodes.delivery.checked
            this.cost()
        }
        this.nodes.assembling.oninput = () => {
            this.mods.assembling = this.nodes.assembling.checked
            this.cost()
        }
        this.nodes.sale.oninput = () => {
            let value = parseFloat(this.nodes.sale.value, 10)
            if (Number.isInteger(value) && !isNaN(value)) {
                if (value >= 0 && value <= 100) {
                    this.mods.sale = value
                } else {
                    if (value < 0) {
                        this.mods.sale = 0
                    } else if (value > 100) {
                        this.mods.sale = 100
                    }
                }
            } else {
                this.mods.sale = 0
            }
            this.cost()
        }

        this.nodes.send.onclick = () => {
            this.fetchData()
        }
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
                const wrapper = document.querySelector('[data-calcui-entity="1"]').cloneNode(true)

                wrapper.setAttribute('data-calcui-entity', `${id + 1}`)
                wrapper.querySelector('.place-block__header .place-block__title').textContent = `Обработка стекла №${id + 1}`

                // checkboxes
                let polishing = wrapper.querySelector('[data-calcui="polishing"]'),
                    polishingLabel = wrapper.querySelector('[data-calcui="polishing"]').nextElementSibling;
                polishing.setAttribute('id', `cf${id}1`);
                polishingLabel.setAttribute('for', `cf${id}1`);

                let grinding = wrapper.querySelector('[data-calcui="grinding"]'),
                    grindingLabel = wrapper.querySelector('[data-calcui="grinding"]').nextElementSibling;
                grinding.setAttribute('id', `cf${id}2`);
                grindingLabel.setAttribute('for', `cf${id}2`);

                let hardening = wrapper.querySelector('[data-calcui="hardening"]'),
                    hardeningLabel = wrapper.querySelector('[data-calcui="hardening"]').nextElementSibling;
                hardening.setAttribute('id', `cf${id}3`);
                hardeningLabel.setAttribute('for', `cf${id}3`);


                let impregnation = wrapper.querySelector('[data-calcui="impregnation"]'),
                    impregnationLabel = wrapper.querySelector('[data-calcui="impregnation"]').nextElementSibling;
                impregnation.setAttribute('id', `cm${id}1`);
                impregnationLabel.setAttribute('for', `cm${id}1`);

                let printing = wrapper.querySelector('[data-calcui="printing"]'),
                    printingLabel = wrapper.querySelector('[data-calcui="printing"]').nextElementSibling;
                printing.setAttribute('id', `cm${id}2`);
                printingLabel.setAttribute('for', `cm${id}2`);

                let uv = wrapper.querySelector('[data-calcui="uv"]'),
                    uvLabel = wrapper.querySelector('[data-calcui="uv"]').nextElementSibling;
                uv.setAttribute('id', `cm${id}3`);
                uvLabel.setAttribute('for', `cm${id}3`);

                this.nodes.root.insertBefore(wrapper, this.nodes.newGlass)
            }

            renderEntity(_id)
            window.revokeDropdown()
            window.revokeTooltip()

            this.entity.push({
                id: _id,
                _ref: new sClEntity({ root: `[data-calcui-entity="${_id + 1}"]`, id: _id }, () => { this.cost() }),
                sum: 0
            })

            this.cost()
        }
    }

    cost() {
        this.data = []
        this.entity.forEach((ent, index) => {
            this.data.push(ent._ref.getData())  
        })
        this.renderList()
    }

    calcEntity(entityData, entityId) {
        const _entityRoot = document.querySelector(`[data-calcui-entity="${entityId + 1}"]`)
        let result = {
            entity: 0,
            glass: [],
            misc: 0
        }
        let gSum = 0

        let thick = entityData.thick
        const squareGlassMultiplayer = thick

        let facet = 0, facetOut = _entityRoot.querySelector('[data-calcui-result="facet"]')
        let polishing = 0, polishingOut = _entityRoot.querySelector('[data-calcui-result="polishing"]')
        let grinding = 0, grindingOut = _entityRoot.querySelector('[data-calcui-result="grinding"]')
        let hardening = 0, hardeningOut = _entityRoot.querySelector('[data-calcui-result="hardening"]')

        let cpu = 0, cpuOut = _entityRoot.querySelector('[data-calcui-result="cpu"]')
        let clay = 0, clayOut = _entityRoot.querySelector('[data-calcui-result="clay"]')
        let drilling = 0, drillingOut = _entityRoot.querySelector('[data-calcui-result="drilling"]')
        let cutout = 0, cutoutOut = _entityRoot.querySelector('[data-calcui-result="cutout"]')

        let sandblast = 0, sandblastOut = _entityRoot.querySelector('[data-calcui-result="sandblast"]')

        let membrane = 0, membraneOut = _entityRoot.querySelector('[data-calcui-result="membrane"]')
        let impregnation = 0, impregnationOut = _entityRoot.querySelector('[data-calcui-result="impregnation"]')
        let printing = 0, printingOut = _entityRoot.querySelector('[data-calcui-result="printing"]')
        let uv = 0, uvOut = _entityRoot.querySelector('[data-calcui-result="uv"]')

        const renderLocalResult = (value, node) => {
            node.textContent = `+${value} руб.` 
        }

        entityData.glasses.forEach((glass, index) => {
            let rm = 1, dm = 1
            if (glass.data.radius) rm = 1.5
            if (glass.data.diameter) dm = 2
            
            let p = ((glass.data.width * 2 + glass.data.height * 2) / 1000) * glass.data.quant
            let s = ((glass.data.width * glass.data.height) / 1000000) * glass.data.quant

            facet += Math.floor(entityData.facet * p * rm * dm)
            if (entityData.polishing) polishing += Math.floor(p * 150 * rm * dm)
            if (entityData.grinding) grinding += Math.floor(p * 120 * rm * dm)
            if (entityData.hardening) hardening += Math.floor(s * 850 * rm * dm)


            cpu += Math.floor(entityData.cpu * 900 * rm * dm)
            clay += Math.floor(entityData.clay * 560 * rm * dm)

            if (p !== 0) {
                drilling += Math.floor(entityData.drilling * rm * dm)
            } else {
                drilling = 0
            }
            if (p !== 0) {
                cutout += Math.floor(entityData.cutout * 650 * rm * dm)
            } else {
                cutout = 0
            }

            sandblast += Math.floor(entityData.sandblast * s * rm * dm)

            membrane += Math.floor(entityData.membrane * s * rm * dm)
            if (entityData.impregnation) impregnation += Math.floor(s * 250 * rm * dm)
            if (entityData.printing) printing += Math.floor(s * 3000 * rm * dm)
            if (entityData.uv) uv += Math.floor(s * 5900 * rm * dm)

            result.glass[index] = s * squareGlassMultiplayer * glass.data.quant * rm * dm
            gSum += result.glass[index]
        })

        renderLocalResult(facet, facetOut)
        renderLocalResult(polishing, polishingOut)
        renderLocalResult(grinding, grindingOut)
        renderLocalResult(hardening, hardeningOut)
        renderLocalResult(cpu, cpuOut)
        renderLocalResult(clay, clayOut)
        renderLocalResult(drilling, drillingOut)
        renderLocalResult(cutout, cutoutOut)
        renderLocalResult(sandblast, sandblastOut)
        renderLocalResult(membrane, membraneOut)
        renderLocalResult(impregnation, impregnationOut)
        renderLocalResult(printing, printingOut)
        renderLocalResult(uv, uvOut)

        result.misc = facet + polishing + grinding + hardening + cpu + clay + drilling + cutout + sandblast + membrane + impregnation + printing + uv
        result.entity = result.misc + gSum
        result.gSum = gSum

        return result
    }

    calcAll(allData) {
        let t = 0
        let tmp = 0
        allData.forEach((d, i) => {
            tmp = this.calcEntity(d, i)            
            t += tmp.entity
        })

        return t
    }

    // Render table with detailing info
    renderList() {
        if (this.data[0]) {
            this.nodes.listWrapper.innerHTML = ''
            this.data.forEach((el, index) => {
                const block = document.createElement('div')
                const result = this.calcEntity(el, index)
                block.classList.add('place-block-cost__list-block')
                block.innerHTML += `
                    <div class="place-block-cost__list-title-row">
                        <p class="place-block-cost__list-title">Обработка №${index + 1}</p>
                        <span class="place-block-cost__list-value">${result.entity} р.</span>
                    </div>
                `
                
                const body = document.createElement('div')
                body.classList.add('place-block-cost__list-body')

                el.glasses.forEach((el, index) => {
                    body.innerHTML += `
                        <div class="place-block-cost__list-item">
                            <p class="place-block-cost__list-item-text">Стекло (${el.data.width}х${el.data.height}мм)</p>
                            <span class="place-block-cost__list-value">${result.glass[index]} р.</span>
                        </div>
                    `
                })
                
                body.innerHTML +=`
                    <div class="place-block-cost__list-item">
                        <p class="place-block-cost__list-item-text">Действия над стеклами</p>
                        <span class="place-block-cost__list-value">${result.misc} р.</span>
                    </div>
                `

                block.append(body)
                this.nodes.listWrapper.append(block)
            })
            this.renderTotal(this.data)
        }
    }

    renderTotal(allData) {
        let total = this.calcAll(allData)

        if (this.mods.measure) {
            total += 600
        }

        if (this.mods.delivery) {
            total += 600
        }

        if (this.mods.assembling) {
            total = Math.floor(total * 1.3)
        }


        let resultSale = 1 - (this.mods.sale / 100)
        let saleExact = total - total * resultSale;

        total = Math.floor(total * resultSale)

        const totalOut = document.querySelector('[data-calcui-total]')
        const saleOut = document.querySelector('[data-calcui-result="sale"]')
        totalOut.textContent = `${total} р.`
        saleOut.textContent = `-${saleExact}`

        this.total = total
    }

    fetchData() {
        this.cost()

        const processings = {
            measure: this.mods.measure,
            delivery: this.mods.delivery,
            assembling: this.mods.assembling,
            sale: this.mods.sale,
            total: this.total,
            all: this.data
        }

        console.log(JSON.stringify(processings))
        
        async function sendData() {
            let url = 'https://steklo-centr.by/include/calc/out_ajax.php'
            let req = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(processings)
            })

            if (req.ok) {
                let json = await req.json()
                console.log(json)
            }
        }

        sendData()
        
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

function revokeTooltip() {
    let tooltipElem

    document.addEventListener('mouseover', (event) => {
        let target = event.target

        let tooltipHtml = target.dataset.tooltip
        if (!tooltipHtml) return

        tooltipElem = document.createElement('div')
        tooltipElem.classList.add('calcui-tooltip')
        tooltipElem.innerHTML = tooltipHtml
        document.body.append(tooltipElem)

        let coords = target.getBoundingClientRect()

        let left = coords.left + (target.getAttribute('width') - tooltipElem.offsetWidth) / 2
        if (left < 0) left = 0

        let top = coords.top - tooltipElem.offsetHeight - 5
        if (top < 0) {
            top = coords.top + target.getAttribute('height') + 5
        }

        tooltipElem.style.left = left + 'px'
        tooltipElem.style.top = top + 'px'
    })

    document.addEventListener('mouseout', (e) => {
        if (tooltipElem) {
            tooltipElem.remove()
            tooltipElem = null
        }
    })
}

window.addEventListener('load', () => { 
    const calc = new sCl()
    window.revokeDropdown()
    window.revokeTooltip()
})