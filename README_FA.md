# MasterHttpRelayVPN-Rust cloudflare worker patch

[English](README.md) | [Farsi](README_FA.md)

اسکریپت شخصی‌سازی‌شده Cloudflare Worker برای استفاده در اکوسیستم MasterHttpRelayVPN.

---

## درباره پروژه

این مخزن شامل پروژه کامل اصلی نیست.

این ریپو فقط شامل نسخه‌ای تغییر داده‌شده و شخصی‌سازی‌شده از فایل `worker.js` است که برای استفاده عمومی/شخصی، آزمایش و بهبود سازگاری آماده شده.

این مخزن نباید به‌عنوان فورک رسمی یا جایگزین پروژه‌های اصلی در نظر گرفته شود؛ بلکه صرفاً یک لایه شخصی‌سازی کوچک و مشتق‌شده است.

---

## اعتبارها (Credits)

پروژه اصلی و ایده اولیه:

- [MasterHttpRelayVPN by Masterking32](https://github.com/Masterking32/MasterHttpRelayVPN?utm_source=chatgpt.com)

پیاده‌سازی/مرجع مرتبط:

- [MasterHttpRelayVPN-Rust by therealaleph](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)

---

## توضیحات

نسخه دقیق upstream یا فورکی که این فایل در ابتدا از آن گرفته شده مشخص نیست، چون فایل ابتدا به‌صورت خصوصی به اشتراک گذاشته شده بود و بعداً تغییر داده شد.

---

## تغییرات

تغییرات اعمال‌شده روی `worker.js` شامل موارد زیر است:

- بهبود اعتبارسنجی درخواست‌ها
- ایمن‌تر شدن پردازش JSON و مدیریت خطاها
- مدیریت بهتر درخواست‌های ناقص یا خراب
- کاهش احتمال کرش در اثر درخواست‌های malformed
- ساده‌تر و تمیزتر شدن منطق جلوگیری از self-fetch
- رفتار قابل‌پیش‌بینی‌تر برای متدهای HTTP
- بهبود جزئی ساختار و خوانایی کد

---

## استفاده

این Worker برای استفاده در پروژه زیر طراحی شده:

- [MasterHttpRelayVPN-Rust](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)

این مخزن به‌تنهایی یک پروژه کامل یا جایگزین مستقل محسوب نمی‌شود.

---

## لایسنس

این مخزن تحت لایسنس MIT منتشر می‌شود.

اعتبار و attribution مربوط به افراد زیر است:

- Masterking32
- therealaleph
- izHaman

لطفاً attribution و شرایط لایسنس پروژه‌های upstream را حفظ کنید.
