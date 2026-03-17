const fallbackProjects = [
    {
        title: "AWS Infrastructure Automation",
        description: "Automated provisioning of EC2, VPC, IAM, RDS, and S3 resources on AWS using Terraform.",
        stack: ["AWS", "Terraform", "RDS"],
        link: "https://github.com/DevOpsBahadurKhan"
    },
    {
        title: "Jenkins CI/CD Pipeline",
        description: "Automated build and deployment workflows with Jenkins, Git, Docker, and Kubernetes.",
        stack: ["Jenkins", "Docker", "Kubernetes"],
        link: "https://github.com/DevOpsBahadurKhan"
    },
    {
        title: "Monitoring and Log Management",
        description: "Implemented centralized logging and server monitoring with ELK, CloudWatch, and SNS alerting.",
        stack: ["ELK", "CloudWatch", "SNS"],
        link: "https://github.com/DevOpsBahadurKhan"
    }
];

function createTag(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (typeof text === "string") element.textContent = text;
    return element;
}

function createExternalButton(text, href) {
    const link = createTag("a", "btn btn-sm btn-outline-light", text);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
}

function renderProjects(projects) {
    const list = document.getElementById("project-list");
    if (!list) return;

    list.textContent = "";

    projects.forEach((project) => {
        const col = createTag("div", "col-md-6 col-lg-4");
        const article = createTag("article", "card project-card h-100 p-2");

        const image = document.createElement("img");
        image.className = "card-img-top rounded";
        image.src = project.image || "assets/project-placeholder-600x340.svg";
        image.alt = `${project.title || "Project"} preview`;
        image.width = 600;
        image.height = 340;
        image.loading = "lazy";
        image.decoding = "async";
        article.appendChild(image);

        const body = createTag("div", "card-body d-flex flex-column");
        body.appendChild(createTag("h5", "card-title", project.title || "Project"));
        body.appendChild(createTag("p", "card-text mb-3", project.description || ""));
        if (project.impact) {
            body.appendChild(createTag("p", "card-text small fw-semibold mb-3", `Impact: ${project.impact}`));
        }

        const stackWrap = createTag("div", "d-flex flex-wrap gap-2 mb-3");
        (project.stack || []).forEach((item) => stackWrap.appendChild(createTag("span", "chip", item)));
        body.appendChild(stackWrap);

        const actions = createTag("div", "d-flex gap-2 mt-auto flex-wrap");
        if (project.link) actions.appendChild(createExternalButton("View Details", project.link));
        if (project.repo) actions.appendChild(createExternalButton("GitHub", project.repo));
        body.appendChild(actions);

        article.appendChild(body);
        col.appendChild(article);
        list.appendChild(col);
    });
}

async function loadProjects() {
    try {
        const response = await fetch("projects.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Request failed");

        const projects = await response.json();
        if (!Array.isArray(projects) || projects.length === 0) {
            renderProjects(fallbackProjects);
            return;
        }

        renderProjects(projects);
    } catch (error) {
        renderProjects(fallbackProjects);
    }
}

function setupThemeToggle() {
    const root = document.documentElement;
    const button = document.getElementById("themeToggle");
    if (!button) return;

    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        button.setAttribute("aria-pressed", String(theme === "dark"));
        const icon = theme === "dark" ? "fa-sun" : "fa-moon";
        const label = theme === "dark" ? "Light" : "Dark";
        button.innerHTML = `<i class="fa-solid ${icon} me-1"></i>${label}`;
    };

    const saved = localStorage.getItem("portfolio_theme") || "light";
    applyTheme(saved);

    button.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem("portfolio_theme", next);
        applyTheme(next);
    });
}

loadProjects();
setupThemeToggle();
