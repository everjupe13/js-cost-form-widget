class sClEntity {
    constructor(opt, callback) {

        this.root = document.querySelector(opt.root)

        this.scl = {}
        this.scl.callback = callback

        this.nodes = {
            glasses: []
        }
        this.data = {}
        this.initGlassesBlock()
        this.registerRadios()



    }

    // glases block (количество стекл)
    initGlassesBlock(state, callback) {
        const _glasses = this.nodes.glasses
        const _glassesRoot = this.root.querySelector('[data-calcui=glasses]')
        _glassesRoot.innerHTML = ''

        const addGlass = () => {
            const render = (id) => {
                const template = `
                    <div class="inner-block__subtitle">
                        <span class="inner-block__subtitle-text">Стекло №1</span>
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
                            <span class="calcui-text-smaller">0.00 м2</span>
                            <span class="calcui-text-smaller">0.00 п. м.</span>
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
                                <input data-calcui-inp="radius" type="checkbox" id="cu11"
                                    class="calcui-checkbox calcui-checkbox__light">
                                <label for="cu11" class="calcui-checkbox__btn"></label>
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
                                <input data-calcui-inp="diameter" type="checkbox" id="cu12"
                                    class="calcui-checkbox calcui-checkbox__light">
                                <label for="cu12" class="calcui-checkbox__btn"></label>
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

                const width = glass.querySelector('[data-calcui-inp="width"]')
                width.addEventListener('input', () => {
                    console.log(width.value)
                    this.scl.callback()
                })
                
            }


            const newGlass = render()
            dynamicBinding(newGlass)


            const _id = this.nodes.glasses.length - 1

            this.nodes.glasses.push({
                id: _id,
                el: newGlass,
                data: {
                    width: 0,
                    height: 0,
                    quant: 1,
                    radius: false,
                    diameter: false,
                }
            })
        }

        const deleteGlasses = (id) => { }

        const getSum = () => { }


        Array.from(document.querySelector('[data-calcui=glasses]').children).forEach(item => {
            console.log(item)
        })

        addGlass()


    }

    // material, thick, 
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

        this.nodes.material = []
        this.data.material = 0

        this.nodes.thick = []
        this.data.thick = 0
        Array.from(document.querySelector('[data-calcui=material]').children).forEach((el, index) => {
            this.nodes.material.push({
                id: index,
                isActive: false,
                el: el,
                value: () => {
                    return parseInt(el.getAttribute('data-calcui-value'), 10) || 0
                },
                bind: () => { this.observe('material') }
            })
        })
        Array.from(document.querySelector('[data-calcui=thick]').children).forEach((el, index) => {
            this.nodes.thick.push({
                id: index,
                isActive: false,
                el: el,
                value: () => {
                    return parseInt(el.getAttribute('data-calcui-value'), 10) || 0
                },
                bind: () => { this.observe('thick') }
            })
        })


        this.nodes.material.forEach((obj) => {
            obj.el.addEventListener('click', () => {
                toggle(obj, this.nodes.material)
                obj.bind()
            })
        })

        this.nodes.thick.forEach((obj) => {
            obj.el.addEventListener('click', () => {
                toggle(obj, this.nodes.thick)
                obj.bind()
            })
        })
    }

    observe(type) {
        switch (type) {
            case 'material': // material cost @int
                this.nodes.material.forEach(item => {
                    if (item.isActive) {
                        this.data.material = item.value()
                    }
                })
                break;
            case 'thick': // thick cost @int
                this.nodes.thick.forEach(item => {
                    if (item.isActive) {
                        this.data.thick = item.value()
                    }
                })
                break;
            case 'glass': // glass cost @int


                break;
        }

        console.log(this.data)
    }

    getSum() {

        return 0
    }
}


class sCl {
    constructor() {
        this.entity = []

        // this.setSum()
    }

    addEntity() {
        this.entity.push(
            {
                id: 0,
                _ref: new sClEntity({ root: '[data-calcui-entity="1"]' }, this.cost),
                sum: 0
            },
        )
    }

    cost() {
        console.log('cost outter func')

        this.entity.forEach((ent, index) => {
            let data = ent._ref.getData()

        })
    }

    setSum() {
        // this.glasses.forEach(el => {
        //     el.sum = el.glass.getSum()
        // })
    }
}


// Общий класс обработчика который получает с каждого стекла сумму и данные считает их и отображает
// содержит данные о каждом стекле для отображения


window.addEventListener('load', () => {

    const calc = new sCl()
    calc.addEntity()



    // temporary logic

    const newGlass = document.querySelector('[data-calcui-action=newglass]')

    newGlass.addEventListener('click', () => {
        // console.log('click')
    })


})