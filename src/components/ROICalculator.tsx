"use client";

import { useState } from "react";
import { FiClock, FiUsers, FiTrendingUp, FiArrowRight } from "react-icons/fi";

const WORKDAYS_PER_YEAR = 245;
const FTE_HOURS_PER_YEAR = 1760;

export function ROICalculator() {
  const [minutesPerDay, setMinutesPerDay] = useState(30);
  const [people, setPeople] = useState(3);

  const hoursPerYear = Math.round((minutesPerDay * people * WORKDAYS_PER_YEAR) / 60);
  const fte = hoursPerYear / FTE_HOURS_PER_YEAR;
  const daysFreed = Math.round(hoursPerYear / 8);

  return (
    <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5 sm:p-6">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 items-center">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#6b7280] dark:text-[#94a3b8] mb-2">
              <FiClock className="text-[#1a56db]" /> Manual task — minutes per day
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={240}
                step={5}
                value={minutesPerDay}
                onChange={(e) => setMinutesPerDay(Number(e.target.value))}
                className="flex-1 accent-[#1a56db]"
              />
              <span className="text-[14px] font-medium text-[#111827] dark:text-[#f1f5f9] tabular-nums w-14 text-right">
                {minutesPerDay} min
              </span>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#6b7280] dark:text-[#94a3b8] mb-2">
              <FiUsers className="text-[#1a56db]" /> People doing this task
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={30}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="flex-1 accent-[#1a56db]"
              />
              <span className="text-[14px] font-medium text-[#111827] dark:text-[#f1f5f9] tabular-nums w-14 text-right">
                {people}
              </span>
            </div>
          </div>
          <p className="text-[10.5px] text-[#9ca3af] dark:text-[#64748b] leading-snug">
            Assumes {WORKDAYS_PER_YEAR} working days/year · 1 FTE = {FTE_HOURS_PER_YEAR.toLocaleString()} hrs — the same
            math I use in real PDD/ROI sizing.
          </p>
        </div>

        <div className="hidden md:block w-px h-32 bg-[#e5e7eb] dark:bg-[#1e293b]" />

        {/* Output */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#6b7280] dark:text-[#94a3b8] mb-3 flex items-center gap-1.5">
            <FiTrendingUp className="text-[#059669]" /> If automated, per year you free up
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <div className="text-[24px] font-medium leading-none tracking-tight text-[#111827] dark:text-[#f1f5f9] tabular-nums">
                {hoursPerYear.toLocaleString()}
              </div>
              <div className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8] mt-1">hours</div>
            </div>
            <div>
              <div className="text-[24px] font-medium leading-none tracking-tight text-[#111827] dark:text-[#f1f5f9] tabular-nums">
                {daysFreed.toLocaleString()}
              </div>
              <div className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8] mt-1">work days</div>
            </div>
            <div>
              <div className="text-[24px] font-medium leading-none tracking-tight text-[#059669] tabular-nums">
                {fte.toFixed(2)}
              </div>
              <div className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8] mt-1">FTE</div>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[12px] px-3.5 py-2 rounded-md bg-[#1a56db] hover:bg-[#1e40af] text-white font-medium transition-colors"
          >
            Have a task like this? Let&apos;s talk <FiArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}
