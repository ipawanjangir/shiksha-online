/**
 * Online Shiksha - Main JavaScript File
 * Handles: Scroll Animations, Tab Switching, Form Submission, & Admin Dashboard
 */

// --- 1. Global Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initTabDetection();
    
    // Check if we are on Contact Page
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        handleFormSubmission(registrationForm);
    }

    // Check if we are on Admin Page
    const studentTable = document.getElementById('studentTableBody');
    if (studentTable) {
        fetchStudents();
        setupSearch();
    }
});

// --- 2. Scroll Animation Logic ---
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// --- 3. Tab Switching Detection (Anti-Cheat) ---
function initTabDetection() {
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            // SweetAlert tab wapas aane par dikhega
            Swal.fire({
                title: 'Attention Student!',
                text: 'Focus on your studies! Switching tabs is not allowed during class. 🎓',
                icon: 'warning',
                confirmButtonColor: '#764ba2'
            });
        }
    });
}

// --- 4. Contact Form Submission (Spring Boot Integration) ---
function handleFormSubmission(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const studentData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            course: document.getElementById('courseInterest').value 
        };

        try {
            const response = await fetch('http://localhost:8081/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your registration has been submitted successfully. 🚀',
                    icon: 'success',
                    confirmButtonColor: '#764ba2'
                }).then(() => {
                    form.reset(); 
                    window.location.href = "index.html"; 
                });
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            Swal.fire({
                title: 'Connection Error',
                text: 'Backend server (Port 8081) se connect nahi ho pa raha hai.',
                icon: 'error'
            });
        }
    });
}

// --- 5. Admin Dashboard Logic ---
async function fetchStudents() {
    const tableBody = document.getElementById('studentTableBody');
    try {
        const response = await fetch('http://localhost:8081/api/auth/students');
        if (!response.ok) throw new Error("Data fetch error");
        
        const students = await response.json();
        tableBody.innerHTML = ''; // Clear loader/previous data

        students.forEach((student, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td class="fw-bold">${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td><span class="badge" style="background: #764ba2;">${student.course || 'N/A'}</span></td>
                    <td><span class="badge bg-success">Verified</span></td>
                </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Fetch Error:', error);
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Backend se data nahi mil raha! Check Port 8081.</td></tr>';
    }
}

// --- 6. Admin Search Feature ---
function setupSearch() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('keyup', () => {
            let filter = searchBar.value.toUpperCase();
            let rows = document.querySelector("#studentTableBody").rows;
            
            for (let i = 0; i < rows.length; i++) {
                let nameCol = rows[i].cells[1].textContent.toUpperCase();
                rows[i].style.display = nameCol.indexOf(filter) > -1 ? "" : "none";
            }
        });
    }
}