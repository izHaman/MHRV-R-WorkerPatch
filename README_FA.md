# پچ Cloudflare Worker برای MasterHttpRelayVPN-Rust

[English](README.md) | [Farsi](README_FA.md)

اسکریپت‌های شخصی‌سازی‌شده و بهینه‌شده سمت Relay برای اکوسیستم MasterHttpRelayVPN.

---

## درباره پروژه

این مخزن شامل پروژه کامل اصلی نیست.

این ریپو شامل نسخه‌های تغییر داده‌شده فایل‌های زیر است:

- `worker.js`
- `Code.gs`

این فایل‌ها برای استفاده عمومی/شخصی، آزمایش، بهبود سازگاری و افزایش پایداری سمت Relay آماده شده‌اند.

این مخزن نباید به‌عنوان فورک رسمی یا جایگزین کامل پروژه‌های upstream در نظر گرفته شود؛ بلکه صرفاً یک لایه شخصی‌سازی و patch مشتق‌شده است.

---

## اعتبارها (Credits)

پروژه اصلی و ایده اولیه:

- [MasterHttpRelayVPN by Masterking32](https://github.com/Masterking32/MasterHttpRelayVPN?utm_source=chatgpt.com)

پیاده‌سازی/مرجع مرتبط:

- [MasterHttpRelayVPN-Rust by therealaleph](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)


---

## تغییرات

تغییرات اعمال‌شده روی اسکریپت‌های Relay شامل موارد زیر است:

- بهبود اعتبارسنجی درخواست‌ها
- ایمن‌تر شدن پردازش JSON و مدیریت خطاها
- مدیریت بهتر درخواست‌های ناقص یا malformed
- کاهش احتمال کرش در اثر درخواست‌های نامعتبر
- ساده‌تر و تمیزتر شدن منطق جلوگیری از self-fetch
- رفتار قابل‌پیش‌بینی‌تر برای متدهای HTTP
- بهبود جزئی ساختار و خوانایی کد
- ایمن‌تر شدن نرمال‌سازی درخواست‌ها در Google Apps Script
- بهبود پایداری و نگهداری‌پذیری سمت Relay

---

## استفاده

این فایل‌های تغییر داده‌شده برای جایگزینی فایل‌های اصلی سمت Relay در پروژه زیر طراحی شده‌اند:

- [MasterHttpRelayVPN-Rust](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)

این مخزن به‌تنهایی برای عملکرد به‌عنوان یک پیاده‌سازی مستقل از اکوسیستم upstream طراحی نشده است.

---

## توضیحات

نسخه دقیق upstream یا فورکی که این فایل‌ها در ابتدا از آن گرفته شده‌اند مشخص نیست، چون فایل‌ها ابتدا به‌صورت خصوصی به اشتراک گذاشته شده بودند و بعداً تغییر داده شدند.

هدف این مخزن حفظ سازگاری با اکوسیستم موجود در کنار بهبود ایمنی، پایداری و نگهداری‌پذیری است.

---

## لایسنس

این مخزن تحت لایسنس MIT منتشر می‌شود.

اعتبار و attribution مربوط به افراد زیر است:

- Masterking32
- therealaleph
- izHaman

لطفاً attribution و شرایط لایسنس پروژه‌های upstream را حفظ کنید.
