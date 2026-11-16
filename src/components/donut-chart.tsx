import Svg, { Circle } from 'react-native-svg';

export type DonutSlice = {
  value: number;
  color: string;
};

type DonutChartProps = {
  data: DonutSlice[];
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
};

export function DonutChart({
  data,
  size = 224,
  strokeWidth = 24,
  trackColor = '#F1ECE3',
}: DonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = strokeWidth * 1.05;

  let offset = 0;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {data.map((slice, index) => {
        const length = (slice.value / total) * circumference;
        const dash = Math.max(length - gap, 0.5);
        const dashOffset = -offset;

        offset += length;

        return (
          <Circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={slice.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={[dash, circumference - dash]}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
    </Svg>
  );
}
