import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface FormValues {
    projectName: string;
    projectTrack: string;
    description: string;
    figmaLink: string;
    githubLink: string;
    otherLinks: string;
}

import send from "@/assets/images/Send.svg"
import Image from 'next/image';
const tracks = ['Track 1', 'Track 2', 'Track 3'];


export default function SubmitProjectForm() {
    const initialValues: FormValues = {
        projectName: '',
        projectTrack: '',
        description: '',
        figmaLink: '',
        githubLink: '',
        otherLinks: ''
    };
    const onSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(false);
    };

    return (

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form className=''>
                    <div className='flex justify-start gap-16 max-[931px]:gap-6 max-[931px]:flex-col'>
                        <div className='w-96 max-[445px]:w-[87vw] flex flex-col gap-6'>
                            <div>
                                <div className="grid w-full max-w-sm items-center gap-4">
                                    <Label htmlFor="project-name" className='text-[#0019FF]'>Project Name<span className='text-[#FF0000]'>*</span></Label>
                                    <Input
                                        type="text"
                                        id="project-name"
                                        placeholder="Shuttle tracker"
                                        className=''
                                        style={{ backgroundColor: 'white', height: '60px' }}

                                    />
                                </div>
                                <ErrorMessage name="projectName" component="div" />
                            </div>
                            <div>
                                <div className="grid w-full max-w-sm items-center gap-4">
                                    <Label htmlFor="project-track" className='text-[#0019FF] '>Project Track<span className='text-[#FF0000]'>*</span></Label>

                                    <Select>
                                        <SelectTrigger style={{ backgroundColor: 'white', height: '60px' }}
                                            id="project-track" className="">
                                            <SelectValue placeholder="Open Innovation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tracks.map((track) => (
                                                <SelectItem key={track} value={track}>
                                                    {track}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <ErrorMessage name="projectTrack" component="div" />
                            </div>
                            <div>
                                <div className="grid w-full max-w-sm items-center gap-4">
                                    <Label htmlFor="description" className='text-[#0019FF]'>Description of Project<span className='text-[#FF0000]'>*</span></Label>

                                    <Textarea
                                        id='description'
                                        placeholder="Don't forget to include your inspiration, learnings, project construction method, and difficulties you encountered in your writing. "
                                        className="col-span-12 md:col-span-6 mb-6 md:mb-0 min-h-40 max-h-72 text-black"

                                    />
                                </div>

                                <p className='text-right pr-2'>500 max words</p>
                                <ErrorMessage name="description" component="div" />
                            </div>
                        </div>
                        <div className='w-96 max-[445px]:w-[87vw] flex flex-col gap-6'>
                            <div>
                                <div className="grid w-full max-w-sm items-center gap-4">
                                    <Label htmlFor="figmaLink" className='text-[#0019FF]'>Figma Link</Label>
                                    <Input
                                        type="text"
                                        id="figmaLink"
                                        placeholder="Figma link"
                                        className=''
                                        style={{ backgroundColor: 'white', height: '60px' }}

                                    />
                                </div>

                                <ErrorMessage name="figmaLink" component="div" />
                            </div>
                            <div>
                                <div className="grid w-full max-w-sm items-center gap-4">
                                    <Label htmlFor="githubLink" className='text-[#0019FF]'>GitHub Link</Label>
                                    <Input
                                        type="text"
                                        id="githubLink"
                                        placeholder="Github link"
                                        className='h-10'
                                        style={{ backgroundColor: 'white', height: '60px' }}

                                    />
                                </div>

                                <ErrorMessage name="githubLink" component="div" />
                            </div>
                            <div>
                                <div className="grid w-full max-w-sm items-center gap-4">
                                    <Label htmlFor="otherLinks" className='text-[#0019FF]'>Other Links</Label>

                                    <Textarea
                                        id='otherLinks'
                                        placeholder='Other links'
                                        className="col-span-12 md:col-span-6 mb-6 md:mb-0 min-h-10"
                                        style={{ color: 'background', height: '60px' }}
                                    />
                                </div>

                                <p>Canva PPTs, Videos, Drive or Supporting Material can be shared</p>
                                <ErrorMessage name="otherLinks" component="div" />
                            </div>
                        </div>

                    </div>



                    <Button className='bg-[#0019FF] my-5' type="submit" disabled={isSubmitting }>
                       <Image src={send as HTMLImageElement} alt='b'/><span className='pl-2'>Submit Project</span> 
                    </Button>
                </Form>
            )}
        </Formik>
    )
}