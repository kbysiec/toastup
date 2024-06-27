import styles from "./ToggleSwitch.module.scss";

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  value,
  onValueChange,
}: ToggleSwitchProps) => {
  return (
    <div className={styles.toggleSwitch}>
      <input
        type="checkbox"
        className={styles.input}
        checked={value}
        onChange={e => onValueChange(e.target.checked)}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
};
