When you import your project on Vercel, you can specify which directory within your monorepo to deploy using the Root Directory setting. This configures Vercel to only deploy that specific directory Using Monorepos.
How to Set It Up:

During Initial Setup:

Go to your Vercel Dashboard
Click "Add New..." → "Project"
Import your Git repository
Before deploying, click "Edit" next to "Root Directory"
Select your landingPage folder
Click Deploy


For Existing Projects:

Go to your project Settings → "General"
Scroll to "Root Directory"
Change it to landingPage
Save changes



Important: What Gets Uploaded
When you set a Root Directory, only the files within that specified directory are considered for deployment Using Monorepos. Your platform folder won't be uploaded to Vercel at all.
Optional: Additional Exclusions with .vercelignore
If you need even more control, you can create a .vercelignore file in your project root to exclude specific files and directories from deployment. This works similarly to .gitignore but is specific to Vercel Exclude Files from Deployments with .vercelignore.
Example .vercelignore in your landingPage folder:
# Exclude specific folders
node_modules
.env.local
*.log
For monorepos, a .vercelignore in the project root directory (your landingPage folder) takes precedence over one at the repository root level Exclude Files from Deployments with .vercelignore.
Official Documentation Links:

Monorepo Guide: https://vercel.com/docs/monorepos
.vercelignore Documentation: https://vercel.com/docs/deployments/vercel-ignore

The platform folder will remain completely separate and won't be part of your Vercel deployment at all. This is a standard pattern for monorepo deployments on Vercel! 🚀