import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

export const Icons = {
  unsplash: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title />
      <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
    </svg>
  ),
  marker: (props: LucideProps) => (
    <svg
      viewBox="0 0 1024 1536"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_185_1161)">
        <path
          d="M1024.47 512.237C1024.47 584.904 1013.47 644.571 991.475 691.237L627.475 1465.24C616.808 1487.24 600.975 1504.57 579.975 1517.24C558.975 1529.9 536.475 1536.24 512.475 1536.24C488.475 1536.24 465.975 1529.9 444.975 1517.24C423.975 1504.57 408.475 1487.24 398.475 1465.24L33.4746 691.237C11.4746 644.571 0.474609 584.904 0.474609 512.237C0.474609 370.904 50.4746 250.237 150.475 150.237C250.475 50.2373 371.141 0.237305 512.475 0.237305C653.808 0.237305 774.475 50.2373 874.475 150.237C974.475 250.237 1024.47 370.904 1024.47 512.237Z"
          fill="black"
        />
        <path
          d="M1024.47 512.237C1024.47 584.904 1013.47 644.571 991.475 691.237L627.475 1465.24C616.808 1487.24 600.975 1504.57 579.975 1517.24C558.975 1529.9 536.475 1536.24 512.475 1536.24C488.475 1536.24 465.975 1529.9 444.975 1517.24C423.975 1504.57 408.475 1487.24 398.475 1465.24L33.4746 691.237C11.4746 644.571 0.474609 584.904 0.474609 512.237C0.474609 370.904 50.4746 250.237 150.475 150.237C250.475 50.2373 371.141 0.237305 512.475 0.237305C653.808 0.237305 774.475 50.2373 874.475 150.237C974.475 250.237 1024.47 370.904 1024.47 512.237Z"
          fill="url(#paint0_linear_185_1161)"
        />
        <circle cx="513" cy="523" r="264" fill="white" />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_185_1161"
          x1="516.5"
          y1="1546.5"
          x2="-342.646"
          y2="957.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF4F18" />
          <stop offset="1" stop-color="#FF8500" />
        </linearGradient>
        <clipPath id="clip0_185_1161">
          <rect width="1024" height="1536" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  arrow: (props: LucideProps) => (
    <svg
      viewBox="0 0 143 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.27186 10.1873C8.61364 17.0396 10.888 23.6055 13.136 30.1751C13.5901 31.483 13.9091 32.4065 14.2082 34.1399C14.4438 35.4249 14.8847 38.1606 13.4532 38.1211C12.2742 37.965 11.457 37.704 10.4465 35.5062C7.86579 29.8178 6.15207 23.7913 4.41944 17.8214C2.8931 12.5488 1.80968 8.50487 0.734724 3.76024C0.23283 1.54432 1.21376 0.490743 3.30849 0.463384C5.18847 0.439508 7.11748 0.381789 8.96685 0.712011C15.6412 1.86617 22.2588 3.18979 28.9218 4.45319C29.7504 4.60499 30.4058 4.67368 31.3661 4.99519C32.5259 5.39608 33.3921 5.62327 33.2361 6.80227C33.099 7.92479 31.5089 8.09598 30.6915 8.02331C23.8467 7.5659 9.74294 6.3868 8.97801 6.49504C11.6826 9.63691 14.12 12.6013 16.7271 15.4342C34.9768 35.0754 54.4718 53.249 78.042 66.5681C96.6994 77.1115 116.283 85.2639 137.106 90.3889C138.334 90.6994 139.55 91.1192 140.714 91.5465C142.299 92.1024 143.026 92.6723 142.795 93.5121C142.149 95.0295 140.977 94.9262 140.035 94.925C138.155 94.9489 136.246 94.5734 134.393 94.2168C109.655 89.1883 87.1467 78.813 65.9086 65.433C44.1096 51.7019 26.2759 33.6699 9.91359 14.0575C9.08994 12.9902 6.80636 10.5422 6.27186 10.1873Z" />
    </svg>
  ),
  dragDrop: (props: LucideProps) => (
    <svg
      viewBox="0 0 85 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 21C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 3H10"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 21H10"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 3H15"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 21H15"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 9V10"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 9V10"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 14V15"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 14V15"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M31 9V15"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M35 9H38V5L45 12L38 19V15H35V9Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M79 3H55C53.3431 3 52 4.34315 52 6V18C52 19.6569 53.3431 21 55 21H79C80.6569 21 82 19.6569 82 18V6C82 4.34315 80.6569 3 79 3Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  inviteLancieMail: (props: LucideProps) => (
    <svg
      {...props}
      viewBox="0 0 205 207"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_664_233)">
        <path
          d="M0 76L100.118 1.76647C101.533 0.717292 103.467 0.717293 104.882 1.76647L205 76V206.971H0V76Z"
          fill="#E4E4E7"
        />
        <path d="M0 76H205V207H0V76Z" fill="#A1A1AA" />
        <rect
          x="9.19824"
          y="19.7115"
          width="186.603"
          height="120.897"
          rx="2"
          fill="url(#paint0_linear_664_233)"
        />
        <g clip-path="url(#clip1_664_233)">
          <path
            d="M124.222 63.0094L76.2692 76.9493L73.76 70.2581C72.9236 67.1914 74.5964 64.1246 77.3844 63.2882L115.022 52.1363C118.089 51.2999 121.156 52.9727 121.992 55.7606L124.222 63.0094Z"
            stroke="white"
            stroke-width="5.36907"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M85.1914 61.058L93.8341 71.9311"
            stroke="white"
            stroke-width="5.36907"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M102.478 55.7608L111.12 66.9127"
            stroke="white"
            stroke-width="5.36907"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M126.453 93.4556V76.9493H76.2695V99.2532C76.2695 100.732 76.857 102.15 77.9027 103.196C78.9484 104.242 80.3667 104.829 81.8455 104.829H104.301"
            stroke="white"
            stroke-width="5.36907"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M108.78 94.1555L117.403 115.713L121.068 106.443L130.338 102.778L108.78 94.1555Z"
            stroke="white"
            stroke-width="4.88097"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <g filter="url(#filter0_d_664_233)">
          <path d="M205 76V207H0L205 76Z" fill="#E4E4E7" />
        </g>
        <g filter="url(#filter1_d_664_233)">
          <path d="M0 76L205 207H0V76Z" fill="#F4F4F5" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_664_233"
          x="-7.88461"
          y="73.3718"
          width="220.769"
          height="146.769"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5.25641" />
          <feGaussianBlur stdDeviation="3.94231" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_664_233"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_664_233"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_664_233"
          x="-10.5128"
          y="70.7436"
          width="226.026"
          height="152.026"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5.25641" />
          <feGaussianBlur stdDeviation="5.25641" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_664_233"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_664_233"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_664_233"
          x1="9.19824"
          y1="19.7115"
          x2="-1.97539"
          y2="118.129"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF8500" />
          <stop offset="1" stop-color="#FF4F18" />
        </linearGradient>
        <clipPath id="clip0_664_233">
          <rect width="205" height="206.971" rx="4" fill="white" />
        </clipPath>
        <clipPath id="clip1_664_233">
          <rect
            width="74.9038"
            height="74.9038"
            fill="white"
            transform="translate(64.3906 43.3654)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  logoText: (props: LucideProps) => (
    <svg viewBox="0 0 329 46" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 44.4948V1.50523H15.48V32.5733H48.96V44.4948H0Z"
        fill="white"
      />
      <path
        d="M97.7091 38.233H73.6491L70.5891 44.4948H53.6091L75.4491 1.50523H96.0891L117.689 44.4948H100.709L97.7091 38.233ZM92.6691 27.877L85.8291 13.788H85.4691L78.6291 27.877H92.6691Z"
        fill="white"
      />
      <path
        d="M179.04 1.50523V44.4948H161.04L138.54 18.7853H138.18V44.4948H123.48V1.50523H141.72L163.92 26.8534H164.34V1.50523H179.04Z"
        fill="white"
      />
      <path
        d="M228.864 18.6649C228.704 17.541 228.164 16.4572 227.244 15.4136C226.364 14.3298 225.084 13.4468 223.404 12.7644C221.724 12.0419 219.684 11.6806 217.284 11.6806C212.884 11.6806 209.544 12.664 207.264 14.6309C204.984 16.5977 203.844 19.3874 203.844 23C203.844 26.6126 204.984 29.4023 207.264 31.3691C209.544 33.336 212.884 34.3194 217.284 34.3194C220.884 34.3194 223.644 33.5768 225.564 32.0916C227.484 30.6065 228.564 28.7199 228.804 26.4319H247.344C247.184 32.8944 244.584 37.7714 239.544 41.0628C234.504 44.3543 227.104 46 217.344 46C197.024 46 186.864 38.3333 186.864 23C186.864 7.66667 197.024 0 217.344 0C227.024 0 234.384 1.60558 239.424 4.81675C244.464 7.98778 247.064 12.6038 247.224 18.6649H228.864Z"
        fill="white"
      />
      <path
        d="M255.223 44.4948V1.50523H270.703V44.4948H255.223Z"
        fill="white"
      />
      <path
        d="M295.148 17.822H326.888V27.1545H295.148V34.0785H328.928V44.4948H279.668V1.50523H328.328V11.6806H295.148V17.822Z"
        fill="white"
      />
    </svg>
  ),
  logoFull: ({ className, ...props }: LucideProps) => (
    <svg
      className={cn(className)}
      {...props}
      viewBox="0 0 296 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M53.5179 17.5712L10.6247 30.0402L8.38026 24.0551C7.63212 21.3119 9.1284 18.5687 11.6222 17.8206L45.2884 7.84544C48.0316 7.0973 50.7747 8.59358 51.5229 11.0874L53.5179 17.5712Z"
        stroke="white"
        stroke-width="4.80253"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.6051 15.8257L26.3359 25.5515"
        stroke="white"
        stroke-width="4.80253"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M34.0671 11.0875L41.7979 21.0627"
        stroke="white"
        stroke-width="4.80253"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M55.5129 44.8047V30.0402H10.6247V49.9906C10.6247 51.3133 11.1501 52.582 12.0855 53.5173C13.0208 54.4527 14.2895 54.9781 15.6122 54.9781H35.6982"
        stroke="white"
        stroke-width="4.80253"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M39.7049 45.4308L47.4179 64.7133L50.696 56.4218L58.9875 53.1438L39.7049 45.4308Z"
        stroke="white"
        stroke-width="4.36593"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M75 47.5183V19.4817H85.4007V39.7435H107.895V47.5183H75Z"
        fill="white"
      />
      <path
        d="M140.649 43.4346H124.483L122.427 47.5183H111.019L125.693 19.4817H139.56L154.073 47.5183H142.664L140.649 43.4346ZM137.262 36.6806L132.667 27.4921H132.425L127.829 36.6806H137.262Z"
        fill="white"
      />
      <path
        d="M195.294 19.4817V47.5183H183.2L168.083 30.7513H167.841V47.5183H157.964V19.4817H170.219L185.135 36.0131H185.417V19.4817H195.294Z"
        fill="white"
      />
      <path
        d="M228.769 30.6728C228.661 29.9398 228.299 29.233 227.681 28.5524C227.089 27.8455 226.229 27.2696 225.101 26.8246C223.972 26.3534 222.601 26.1178 220.989 26.1178C218.032 26.1178 215.788 26.7592 214.256 28.0419C212.724 29.3246 211.959 31.144 211.959 33.5C211.959 35.856 212.724 37.6754 214.256 38.9581C215.788 40.2408 218.032 40.8822 220.989 40.8822C223.407 40.8822 225.262 40.3979 226.552 39.4293C227.842 38.4607 228.567 37.2304 228.729 35.7382H241.185C241.078 39.9529 239.331 43.1335 235.945 45.2801C232.558 47.4267 227.586 48.5 221.029 48.5C207.376 48.5 200.55 43.5 200.55 33.5C200.55 23.5 207.376 18.5 221.029 18.5C227.533 18.5 232.478 19.5471 235.864 21.6414C239.25 23.7094 240.997 26.7199 241.105 30.6728H228.769Z"
        fill="white"
      />
      <path d="M246.479 47.5183V19.4817H256.88V47.5183H246.479Z" fill="white" />
      <path
        d="M273.304 30.123H294.629V36.2094H273.304V40.7251H296V47.5183H262.903V19.4817H295.597V26.1178H273.304V30.123Z"
        fill="white"
      />
    </svg>
  ),
  camStars: (props: LucideProps) => (
    <svg
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16.25 0H13.3333L14.7833 2.175C14.875 2.31667 14.775 2.5 14.6083 2.5H12.9417C12.6667 2.5 12.4 2.35833 12.25 2.125L10.8333 0H9.16667L10.6167 2.175C10.7083 2.31667 10.6083 2.5 10.4417 2.5H8.775C8.5 2.5 8.23333 2.35833 8.08333 2.125L6.66667 0H5L6.45 2.175C6.54167 2.31667 6.44167 2.5 6.275 2.5H4.60833C4.33333 2.5 4.075 2.35833 3.91667 2.125L2.5 0H1.66667C0.75 0 0.00833333 0.75 0.00833333 1.66667L0 11.6667C0 12.5833 0.75 13.3333 1.66667 13.3333H15C15.9167 13.3333 16.6667 12.5833 16.6667 11.6667V0.416667C16.6667 0.183333 16.4833 0 16.25 0ZM7.70833 9.375L6.66667 11.6667L5.625 9.375L3.33333 8.33333L5.625 7.29167L6.66667 5L7.70833 7.29167L10 8.33333L7.70833 9.375ZM12.45 6.61667L11.6667 8.33333L10.8833 6.61667L9.16667 5.83333L10.8833 5.05L11.6667 3.33333L12.45 5.05L14.1667 5.83333L12.45 6.61667Z" />
    </svg>
  ),
  logoRaw: (props: LucideProps) => (
    <svg
      viewBox="0 0 358 358"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M295.058 72.7496L46.3751 145.041L33.3626 110.341C29.0251 94.4371 37.7001 78.5329 52.1584 74.1954L247.346 16.3621C263.25 12.0246 279.154 20.6996 283.492 35.1579L295.058 72.7496Z"
        stroke="white"
        stroke-width="28.9167"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M92.6436 62.6296L137.464 119.017"
        stroke="white"
        stroke-width="28.9167"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M182.288 35.1587L227.109 92.992"
        stroke="white"
        stroke-width="28.9167"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M306.625 230.642V145.042H46.375V260.708C46.375 268.377 49.4216 275.732 54.8445 281.155C60.2674 286.578 67.6225 289.625 75.2917 289.625H191.745"
        stroke="white"
        stroke-width="28.9167"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M214.975 234.272L259.693 346.067L278.698 297.995L326.77 278.99L214.975 234.272Z"
        stroke="white"
        stroke-width="23.2301"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  ),
};
