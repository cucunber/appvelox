import React from 'react';
import s from './Header.module.css';
import nullUser from '../../../assets/imgs/nullUser.png';
import Tooltip from '../../forms/Tooltip/Tooltip';

export default function Header(props) {
    const [activeDropDown, setActiveDropDown] = React.useState(false);
    const [tooltip1, setTooltip1]  = React.useState(false);
    const [tooltip2, setTooltip2]  = React.useState(false);
    const [tooltip3, setTooltip3]  = React.useState(false);

    const hasMsg = true;
    return (
        <section className={s.wrapper}>
            <h3 className={s.headerTitle}>Мой профиль</h3>
            <div className={s.headerBtns} >
                <div className={s.headerBtn}>
                    <Tooltip active={tooltip1} tooltip={"Поиск"}/>
                    <svg onMouseOver={()=>setTooltip1(true)} onMouseLeave={()=>setTooltip1(false)} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6172 0C6.54631 0 3.23438 3.31193 3.23438 7.38281C3.23438 9.17381 3.87542 10.8179 4.94013 12.0977L0.207637 16.798C-0.0678826 17.0717 -0.0693943 17.5168 0.204227 17.7924C0.341688 17.9307 0.522391 18 0.703129 18C0.88225 18 1.06144 17.9319 1.19859 17.7957L5.93754 13.089C7.21224 14.1363 8.84261 14.7656 10.6172 14.7656C11.8837 14.7656 13.1335 14.4393 14.2314 13.8218C14.5699 13.6315 14.6899 13.2028 14.4996 12.8643C14.3092 12.5259 13.8805 12.4057 13.5421 12.5961C12.6542 13.0955 11.6428 13.3594 10.6172 13.3594C7.32172 13.3594 4.64063 10.6783 4.64063 7.38281C4.64063 4.08734 7.32172 1.40625 10.6172 1.40625C13.9127 1.40625 16.5938 4.08734 16.5938 7.38281C16.5938 8.42101 16.3236 9.44328 15.8127 10.3391C15.6203 10.6765 15.7378 11.1059 16.0751 11.2983C16.4124 11.4906 16.8418 11.3732 17.0342 11.0359C17.666 9.92813 18 8.66493 18 7.38281C18 3.31193 14.6881 0 10.6172 0Z" fill="white" />
                    </svg>
                </div>
                <div className={s.headerBtn} >
                <Tooltip active={tooltip2} tooltip={"Уведомления"}/>
                    <span className={`${s.msgIcon} ${hasMsg ? s.hasMsg : ''}`}></span>
                    <svg onMouseOver={()=>setTooltip2(true)} onMouseLeave={()=>setTooltip2(false)} width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 13.3914C15.3385 13.0097 14.9711 12.7582 14.5894 12.8298C14.2077 12.9013 13.9562 13.2687 14.0277 13.6504C14.0808 13.9335 13.9563 14.1353 13.8774 14.2304C13.7987 14.3253 13.6238 14.4844 13.3367 14.4844H2.66358C2.37653 14.4844 2.20159 14.3253 2.12288 14.2304C2.04399 14.1353 1.9195 13.9335 1.97259 13.6504C2.17203 12.5861 2.57221 11.8861 2.95921 11.2091C3.42921 10.3871 3.91521 9.53694 3.91521 8.22653V7.17184C3.91521 4.95464 5.71743 3.12634 7.93364 3.09417H8.06657C10.2753 3.12627 12.0715 4.95457 12.0715 7.17188V8.22656C12.0715 9.34182 12.4363 10.1093 12.7783 10.741C12.9055 10.9762 13.1474 11.1096 13.3972 11.1096C13.5103 11.1096 13.6249 11.0823 13.7313 11.0247C14.0728 10.8399 14.1998 10.4132 14.015 10.0717C13.6747 9.44304 13.4777 8.93957 13.4777 8.22656V7.17188C13.4777 5.72481 12.9173 4.35807 11.8994 3.32346C11.0272 2.43678 9.90725 1.88346 8.6965 1.73074V0.703125C8.6965 0.314789 8.38171 0 7.99337 0C7.60504 0 7.29025 0.314789 7.29025 0.703125V1.73282C4.60227 2.08157 2.509 4.40089 2.509 7.17188V8.22656C2.509 9.16337 2.16893 9.75818 1.73841 10.5112C1.31428 11.2532 0.833523 12.0941 0.590382 13.3914C0.474332 14.0107 0.638511 14.6438 1.04084 15.1286C1.44278 15.6129 2.03428 15.8906 2.66358 15.8906H5.89757C5.89757 17.0537 6.84383 18 8.00694 18C9.17005 18 10.1163 17.0537 10.1163 15.8906H13.3367C13.966 15.8906 14.5575 15.6129 14.9595 15.1286C15.3618 14.6439 15.526 14.0107 15.41 13.3914ZM8.00694 16.5938C7.61924 16.5938 7.30382 16.2783 7.30382 15.8906H8.71007C8.71007 16.2783 8.39468 16.5938 8.00694 16.5938Z" fill="white" />
                    </svg>

                </div>
                <div className={s.headerBtn} >
                <Tooltip active={tooltip3} tooltip={"Версия для слабовидящих "}/>
                    <svg onMouseOver={()=>setTooltip3(true)} onMouseLeave={()=>setTooltip3(false)} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <path d="M9.03586 10.371C9.79308 10.371 10.4069 9.75719 10.4069 8.99997C10.4069 8.24275 9.79308 7.62891 9.03586 7.62891C8.27864 7.62891 7.66479 8.24275 7.66479 8.99997C7.66479 9.75719 8.27864 10.371 9.03586 10.371Z" fill="white" />
                            <path d="M9.03555 4.99219C6.82569 4.99219 5.02783 6.79005 5.02783 8.99992C5.02783 11.2098 6.82569 13.0076 9.03555 13.0076C11.2454 13.0076 13.0433 11.2098 13.0433 8.99992C13.0433 6.79005 11.2454 4.99219 9.03555 4.99219ZM9.03555 11.6014C7.60107 11.6014 6.43405 10.4344 6.43405 8.99992C6.43405 7.56543 7.60107 6.39841 9.03555 6.39841C10.47 6.39841 11.6371 7.56543 11.6371 8.99992C11.6371 10.4344 10.47 11.6014 9.03555 11.6014Z" fill="white" />
                            <path d="M17.5447 7.46517C17.1714 6.89191 16.118 5.42023 14.4034 4.13821C12.6653 2.83866 10.8527 2.17969 9.01579 2.17969C7.18151 2.17969 5.3673 2.83687 3.62354 4.13291C1.9013 5.41295 0.839473 6.8828 0.462878 7.45533C-0.154293 8.39361 -0.154293 9.60612 0.462878 10.5444C0.839473 11.117 1.9013 12.5868 3.62354 13.8669C5.3673 15.1629 7.18148 15.8201 9.01579 15.8201C11.8397 15.8201 14.1106 14.2455 15.5182 12.9246C15.8014 12.6589 15.8156 12.214 15.5499 11.9308C15.2841 11.6476 14.8392 11.6335 14.556 11.8992C13.3334 13.0464 11.3797 14.4139 9.01573 14.4139C5.6019 14.4139 2.77174 11.4959 1.63763 9.77167C1.32924 9.30283 1.32924 8.69701 1.63763 8.22817C2.77174 6.50396 5.6019 3.58598 9.01573 3.58598C12.4294 3.58598 15.2423 6.50677 16.3663 8.2326C16.6698 8.69874 16.6698 9.30111 16.3663 9.76724C16.1544 10.0927 16.2464 10.5282 16.5718 10.7401C16.8972 10.952 17.3328 10.86 17.5447 10.5346C18.1518 9.60229 18.1518 8.39745 17.5447 7.46517Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

            </div>
            <div className={s.userIcon}>
                <img src={props.data.img ? props.data.img : nullUser} alt="" />
            </div>
            <div className={`${s.dropdownHeader} ${activeDropDown ? s.activeDrop : ''}`} onClick={()=>setActiveDropDown(!activeDropDown)}>
                <div className={s.dropdownIcon}></div>
                <div className={s.dropdownMenu}>
                    <button>function</button>
                    <button>function</button>
                    <button>function</button>
                </div>
            </div>
        </section>
    )
}