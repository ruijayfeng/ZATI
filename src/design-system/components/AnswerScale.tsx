const responseLabels = [
  '几乎总是左侧反应',
  '多数时候左侧反应',
  '略偏左侧反应',
  '略偏右侧反应',
  '多数时候右侧反应',
  '几乎总是右侧反应',
];

type AnswerScaleProps = {
  value?: number;
  onChange: (value: number) => void;
  left: string;
  right: string;
};

export function AnswerScale({ value, onChange, left, right }: AnswerScaleProps) {
  return <fieldset className="answer-scale">
    <legend>你的第一反应更接近哪一种？</legend>
    <p className="scale-instruction">请选择更接近你平时第一反应的一侧，而不是更正确的一侧。</p>
    <div className="response-poles">
      <p><span>左侧反应</span>{left}</p>
      <p><span>右侧反应</span>{right}</p>
    </div>
    <div className="scale-grid">
      {responseLabels.map((label, index) => {
        const item = index + 1;
        return <label className="scale-option" key={item}>
          <input aria-label={`${item} · ${label}`} type="radio" name="answer" checked={value === item} onChange={() => onChange(item)} />
          <span className="scale-option-number">{item}</span>
          <span className="scale-option-label">{label}</span>
        </label>;
      })}
    </div>
    <p className="scale-hint">两边都不完全像时，选更常出现的第一反应；接近时选 3 或 4。</p>
    {value !== undefined && <p className="scale-selection" role="status">你选择：{responseLabels[value - 1]}</p>}
  </fieldset>;
}
