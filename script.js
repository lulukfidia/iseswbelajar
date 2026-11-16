document.addEventListener("DOMContentLoaded", function () {
    // 1. Dark / Light Mode
    var themeBtn = document.getElementById("themeToggle");
    var saved = localStorage.getItem("isesw_theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);

    if (themeBtn) {
        themeBtn.textContent = saved === "dark" ? "☀️ Light" : "🌙 Dark";
        themeBtn.addEventListener("click", function () {
            var isDark = document.documentElement.getAttribute("data-theme") === "dark";
            var next = isDark ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("isesw_theme", next);
            themeBtn.textContent = next === "dark" ? "☀️ Light" : "🌙 Dark";
        });
    }

    // 2. Filter Kategori & Pencarian Program
    var tabBtns = document.querySelectorAll(".tab-btn");
    var searchInp = document.getElementById("searchProgram");
    var cards = document.querySelectorAll(".course-card");
    var currentCat = "all";

    function filterPrograms() {
        var keyword = searchInp ? searchInp.value.toLowerCase() : "";
        cards.forEach(function (card) {
            var cat = card.getAttribute("data-cat");
            var title = card.querySelector("h3").textContent.toLowerCase();
            var matchCat = currentCat === "all" || cat === currentCat;
            var matchText = title.indexOf(keyword) !== -1;
            card.style.display = (matchCat && matchText) ? "flex" : "none";
        });
    }

    tabBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            tabBtns.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            currentCat = btn.getAttribute("data-filter");
            filterPrograms();
        });
    });

    if (searchInp) {
        searchInp.addEventListener("input", filterPrograms);
    }

    // 3. Modal Detail Kurikulum & Syarat
    var modal = document.getElementById("syllabusModal");
    var modalTitle = document.getElementById("modalTitle");
    var modalList = document.getElementById("modalList");
    var closeModal = document.getElementById("closeModal");

    var programDetails = {
        paketa: {
            title: "Program Kesetaraan Paket A (Setara SD)",
            items: [
                "Kurikulum Merdeka Pendidikan Kesetaraan",
                "Jadwal belajar fleksibel (Tatap Muka / Daring / Modul)",
                "Pendampingan literasi, numerasi, dan karakter",
                "Ijazah resmi negara terdaftar di Dapodik Kemendikbudristek",
                "Syarat: Fotokopi KK, Akta Kelahiran, dan Pas Foto"
            ]
        },
        paketb: {
            title: "Program Kesetaraan Paket B (Setara SMP)",
            items: [
                "Kurikulum Nasional setara jenjang SMP/MTs",
                "Pembelajaran terpadu dan keterampilan digital",
                "Bimbingan persiapan Asesmen Nasional Berbasis Komputer",
                "Ijazah resmi negara untuk melanjutkan ke SMA/SMK/Paket C",
                "Syarat: Fotokopi Ijazah SD/Paket A, KK, KTP/KIA"
            ]
        },
        paketc: {
            title: "Program Kesetaraan Paket C (Setara SMA)",
            items: [
                "Peminatan IPS / IPA dengan kurikulum fleksibel bagi pekerja",
                "Gratis tambahan pelatihan komputer dan persiapan kerja",
                "Ijazah resmi negara diakui untuk melamar kerja maupun kuliah",
                "Jadwal kelas akhir pekan (Sabtu-Minggu) atau kelas malam",
                "Syarat: Fotokopi Ijazah SMP/Paket B, KK, KTP"
            ]
        },
        itweb: {
            title: "Kursus Pemrograman Web & Aplikasi",
            items: [
                "Dasar HTML5, CSS3 Modern, dan JavaScript",
                "Pembuatan Website Profil Lembaga, UMKM, dan Toko Online",
                "Hosting dan Publikasi Proyek ke GitHub",
                "Sertifikat Kompetensi Pelatihan Vokasi PKBM ISESW"
            ]
        },
        office: {
            title: "Kursus Administrasi Perkantoran Modern",
            items: [
                "Penguasaan Microsoft Word untuk surat resmi dan laporan",
                "Microsoft Excel (Rumus VLOOKUP, IF, Pivot Table, Keuangan)",
                "Presentasi Profesional dengan PowerPoint dan Google Workspace",
                "Sertifikat Kompetensi Siap Kerja"
            ]
        },
        desain: {
            title: "Kursus Desain Grafis & Konten Kreatif",
            items: [
                "Dasar Tata Letak, Tipografi, dan Pemilihan Warna",
                "Pembuatan Poster, Banner, dan Konten Media Sosial di Canva",
                "Editing Video Promosi Singkat untuk Media Sosial",
                "Portofolio Desain dan Sertifikat Kompetensi"
            ]
        },
        marketing: {
            title: "Kursus Digital Marketing & Bisnis UMKM",
            items: [
                "Optimasi Profil Bisnis Google dan WhatsApp Business",
                "Strategi Jualan di Marketplace dan Media Sosial",
                "Dasar Iklan Berbayar (Meta Ads dan TikTok Ads)",
                "Pendampingan Praktik Langsung Pemasaran Produk"
            ]
        },
        teknisi: {
            title: "Kursus Teknisi Komputer & Jaringan Dasar",
            items: [
                "Perakitan PC, Instalasi Sistem Operasi Windows dan Linux",
                "Troubleshooting Hardware dan Software Laptop/Komputer",
                "Instalasi Jaringan LAN, Wi-Fi Router, dan Manajemen Bandwidth",
                "Sertifikat Kompetensi Teknisi Muda"
            ]
        }
    };

    document.querySelectorAll(".btn-syllabus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var key = btn.getAttribute("data-course");
            var data = programDetails[key];
            if (data && modal) {
                modalTitle.textContent = data.title;
                modalList.innerHTML = data.items.map(function (i) {
                    return "<li>" + i + "</li>";
                }).join("");
                modal.style.display = "flex";
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // 4. FAQ Accordion
    document.querySelectorAll(".faq-item").forEach(function (item) {
        item.addEventListener("click", function () {
            var ans = item.querySelector(".faq-a");
            ans.style.display = ans.style.display === "block" ? "none" : "block";
        });
    });

    // 5. Formulir PPDB ke WhatsApp
    var regForm = document.getElementById("regForm");
    if (regForm) {
        regForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var nama = document.getElementById("nama").value;
            var nik = document.getElementById("nik").value;
            var program = document.getElementById("program").value;
            var jadwal = document.getElementById("jadwal").value;
            var alamat = document.getElementById("alamat").value;

            var pesan = "Halo Admin PKBM ISESW! Saya ingin mendaftar sebagai Warga Belajar:%0A" +
                        "- Nama Lengkap: " + nama + "%0A" +
                        "- NIK / No. HP: " + nik + "%0A" +
                        "- Program Pilihan: " + program + "%0A" +
                        "- Pilihan Jadwal: " + jadwal + "%0A" +
                        "- Domisili: " + alamat;

            window.open("https://wa.me" + pesan, "_blank");
        });
    }
});
