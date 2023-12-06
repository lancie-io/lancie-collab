import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

export const Icons = {
  unsplash: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title />
      <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
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
  logoText: (props: LucideProps) => (
    <svg viewBox="0 0 329 46" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 44.4948V1.50523H15.48V32.5733H48.96V44.4948H0Z"
        // fill="#222325"
      />
      <path
        d="M97.7091 38.233H73.6491L70.5891 44.4948H53.6091L75.4491 1.50523H96.0891L117.689 44.4948H100.709L97.7091 38.233ZM92.6691 27.877L85.8291 13.788H85.4691L78.6291 27.877H92.6691Z"
        // fill="#222325"
      />
      <path
        d="M179.04 1.50523V44.4948H161.04L138.54 18.7853H138.18V44.4948H123.48V1.50523H141.72L163.92 26.8534H164.34V1.50523H179.04Z"
        // fill="#222325"
      />
      <path
        d="M228.864 18.6649C228.704 17.541 228.164 16.4572 227.244 15.4136C226.364 14.3298 225.084 13.4468 223.404 12.7644C221.724 12.0419 219.684 11.6806 217.284 11.6806C212.884 11.6806 209.544 12.664 207.264 14.6309C204.984 16.5977 203.844 19.3874 203.844 23C203.844 26.6126 204.984 29.4023 207.264 31.3691C209.544 33.336 212.884 34.3194 217.284 34.3194C220.884 34.3194 223.644 33.5768 225.564 32.0916C227.484 30.6065 228.564 28.7199 228.804 26.4319H247.344C247.184 32.8944 244.584 37.7714 239.544 41.0628C234.504 44.3543 227.104 46 217.344 46C197.024 46 186.864 38.3333 186.864 23C186.864 7.66667 197.024 0 217.344 0C227.024 0 234.384 1.60558 239.424 4.81675C244.464 7.98778 247.064 12.6038 247.224 18.6649H228.864Z"
        // fill="#222325"
      />
      <path
        d="M255.223 44.4948V1.50523H270.703V44.4948H255.223Z"
        // fill="#222325"
      />
      <path
        d="M295.148 17.822H326.888V27.1545H295.148V34.0785H328.928V44.4948H279.668V1.50523H328.328V11.6806H295.148V17.822Z"
        // fill="#222325"
      />
    </svg>
  ),
  logoFull: ({ className, ...props }: LucideProps) => (
    <svg
      viewBox="0 0 688 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-primary fill-primary', className)}
      {...props}
    >
      <path
        d="M91.7417 27.25L13.625 49.9583L9.53749 39.0583C8.17499 34.0625 10.9 29.0667 15.4417 27.7042L76.7542 9.53749C81.75 8.17499 86.7458 10.9 88.1083 15.4417L91.7417 27.25Z"
        stroke-width="12"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M28.1592 24.071L42.2383 41.7835"
        stroke-width="12"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M56.3184 15.4417L70.3975 33.6083"
        stroke-width="12"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M95.375 76.8472V49.9583H13.625V86.2916C13.625 88.7006 14.582 91.011 16.2854 92.7145C17.9889 94.4179 20.2993 95.3749 22.7083 95.3749H59.2887"
        stroke-width="12"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M66.5859 77.9875L80.6328 113.105L86.6027 98.0043L101.703 92.0344L66.5859 77.9875Z"
        fill="none"
        stroke-width="9"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M141 90.4977V18.7693H166.743V70.6066H222.419V90.4977H141Z"
        strokeWidth="0"
      />
      <path
        strokeWidth="0"
        d="M303.488 80.0498H263.477L258.388 90.4977H230.151L266.47 18.7693H300.794L336.714 90.4977H308.477L303.488 80.0498ZM295.107 62.7707L283.732 39.2631H283.133L271.758 62.7707H295.107Z"
      />
      <path
        strokeWidth="0"
        d="M438.74 18.7693V90.4977H408.807L371.39 47.6013H370.791V90.4977H346.345V18.7693H376.678L413.596 61.0629H414.295V18.7693H438.74Z"
      />
      <path
        strokeWidth="0"
        d="M521.596 47.4004C521.33 45.5251 520.432 43.7168 518.902 41.9755C517.438 40.1673 515.31 38.6939 512.516 37.5553C509.722 36.3498 506.33 35.747 502.338 35.747C495.021 35.747 489.467 37.3879 485.675 40.6696C481.884 43.9513 479.988 48.6059 479.988 54.6335C479.988 60.6611 481.884 65.3157 485.675 68.5974C489.467 71.8791 495.021 73.5199 502.338 73.5199C508.325 73.5199 512.915 72.2809 516.108 69.8029C519.301 67.3249 521.097 64.1772 521.496 60.3597H552.327C552.061 71.1424 547.738 79.2796 539.356 84.7715C530.975 90.2633 518.669 93.0092 502.438 93.0092C468.646 93.0092 451.751 80.2173 451.751 54.6335C451.751 29.0497 468.646 16.2578 502.438 16.2578C518.536 16.2578 530.775 18.9367 539.157 24.2946C547.538 29.5855 551.862 37.2874 552.128 47.4004H521.596Z"
      />
      <path
        strokeWidth="0"
        d="M565.43 90.4977V18.7693H591.173V90.4977H565.43Z"
      />
      <path
        strokeWidth="0"
        d="M631.825 45.9939H684.608V61.5652H631.825V73.1181H688V90.4977H606.082V18.7693H687.002V35.747H631.825V45.9939Z"
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
