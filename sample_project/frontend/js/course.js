document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('courses-table-body');
    const modalOverlay = document.getElementById('course-modal');
    const courseForm = document.getElementById('course-form');
    const modalTitle = document.getElementById('modal-title');
    const addCourseBtn = document.getElementById('add-course-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Form fields
    const courseIdInput = document.getElementById('course-id');
    const titleInput = document.getElementById('title');
    const subjectInput = document.getElementById('subject');
    const descriptionInput = document.getElementById('description');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const fromTimeInput = document.getElementById('from-time');
    const toTimeInput = document.getElementById('to-time');

    // Load Courses
    loadCourses();

    async function loadCourses() {
        try {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Loading...</td></tr>';
            const response = await Api.get('/course/getAllCourse');
            
            if (response.status) {
                renderTable(response.data);
            } else {
                tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">${response.msg}</td></tr>`;
            }
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--error);">${error.message}</td></tr>`;
        }
    }

    function renderTable(courses) {
        tableBody.innerHTML = '';
        courses.forEach(course => {
            const tr = document.createElement('tr');
            // Format dates
            const startDate = new Date(course.start_date).toLocaleDateString();
            const endDate = new Date(course.end_date).toLocaleDateString();
            
            tr.innerHTML = `
                <td>${course.title}</td>
                <td>${course.subject}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
                <td>
                    <button class="btn btn-edit" style="color: var(--primary-color); background: none; padding: 0.25rem 0.5rem; margin-right: 0.5rem;">Edit</button>
                    <button class="btn btn-delete" style="color: var(--error); background: none; padding: 0.25rem 0.5rem;">Delete</button>
                </td>
            `;
            
            tr.querySelector('.btn-edit').addEventListener('click', () => openModal(course));
            tr.querySelector('.btn-delete').addEventListener('click', () => deleteCourse(course.id));

            tableBody.appendChild(tr);
        });
    }

    // Modal Logic
    addCourseBtn.addEventListener('click', () => openModal(null));
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    function openModal(course) {
        courseForm.reset();
        if (course) {
            modalTitle.textContent = 'Edit Course';
            courseIdInput.value = course.id;
            titleInput.value = course.title;
            subjectInput.value = course.subject;
            descriptionInput.value = course.description;
            
            // Format dates for input[type="date"] (YYYY-MM-DD)
            const startDate = new Date(course.start_date).toISOString().split('T')[0];
            const endDate = new Date(course.end_date).toISOString().split('T')[0];
            
            startDateInput.value = startDate;
            endDateInput.value = endDate;
            fromTimeInput.value = course.from_time;
            toTimeInput.value = course.to_time;
        } else {
            modalTitle.textContent = 'Add Course';
            courseIdInput.value = '';
        }
        modalOverlay.classList.add('open');
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
    }

    // Submit Logic
    courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const isEdit = !!courseIdInput.value;
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? (user.user_id || user.id) : null;

        if (!userId) {
            showToast('User not authenticated', 'error');
            return;
        }

        const payload = {
            title: titleInput.value,
            subject: subjectInput.value,
            description: descriptionInput.value,
            start_date: startDateInput.value,
            end_date: endDateInput.value,
            from_time: fromTimeInput.value,
            to_time: toTimeInput.value,
        };

        let endpoint = '/course/addCourse';
        
        if (isEdit) {
            endpoint = '/course/updateCourse';
            payload.courseId = courseIdInput.value;
        } else {
            payload.user_id = userId;
        }

        try {
            const response = await Api.post(endpoint, payload);
            if (response.status) {
                showToast(isEdit ? 'Course Updated!' : 'Course Created!', 'success');
                closeModal();
                loadCourses();
            } else {
                showToast(response.msg, 'error');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    async function deleteCourse(id) {
        if (!confirm('Are you sure you want to delete this course?')) return;
        
        try {
            const response = await Api.delete(`/course/deleteCourse/${id}`);
            if (response.status) {
                showToast('Course Deleted', 'success');
                loadCourses();
            } else {
                showToast(response.msg, 'error');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    }
});
