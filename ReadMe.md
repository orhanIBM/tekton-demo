# Deploy a Hello Tekton Nodejs app via Tekton

Tekton - MyApp

Thursday, July 30, 2020
3:58 PM

Source: https://access.redhat.com/documentation/en-us/openshift_container_platform/4.5/html/pipelines/creating-applications-with-cicd-pipelines

Replica Source w/ more details: https://github.com/openshift/pipelines-tutorial
My app source: https://github.com/orhanIBM/tekton-demo

Step 1. Login OC Cluster
Step 2. Create a project
Step 3. check if tekton pipeline service account is installed

$ oc get serviceaccount pipeline

Step 3. Use this 2 files to create reusable tasks

$ oc create -f https://raw.githubusercontent.com/openshift/pipelines-tutorial/release-tech-preview-1/01_pipeline/01_apply_manifest_task.yaml
$ oc create -f https://raw.githubusercontent.com/openshift/pipelines-tutorial/release-tech-preview-1/01_pipeline/02_update_deployment_task.yaml

Step 4. Check if they are created

$ tkn task ls

You should see both files and age

Step 5. Check if buildah exists
Buildah is the image builder, that we will refer to in the yaml files below

$ tkn clustertasks ls

You should see buildah along with s2i, maven etc…
See this note from RedHat documentation:
Note
You must use a privileged Pod container to run the buildah ClusterTask because it requires a privileged security context. To learn more about Security Context Constraints (SCC) for Pods, see the Additional resources section. 

Step 6. Deploy Reusable Pipeline File that converts github to image
$ oc create -f pipeline.yaml

Step 7. Create PipelineResources
Go to resource folder 

$ oc apply -f pipelineresource.yaml


Step Check: so far we preapared the underlying components but haven't run the pipeline, so we need to execute PipelineRun

Step 8. Trigger PipelineRun
Check which resources do we have?

$ tkn resouces ls

Outputs will be git and image resources pointing to github/ibmcr. Now using those resources let's run

$ tkn pipeline start build-and-deploy \
    -r git-repo=app-repo \
    -r image=app-image \
    -p deployment-name=tekton-app
