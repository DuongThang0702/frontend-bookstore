import { FC } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { IBook } from "../../utils/IBook";
import path from "@/utils/path";

interface bookProps {
  book: IBook[] | null;
}

const book: FC<bookProps> = ({ book }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <div className="text-center relative">
      <div>
        <Slider {...settings}>
          {book?.map((el) => {
            return (
              <div key={el._id}>
                <Link href={`/${path.DETAIL_BOOK}/${el._id}`}>
                  <Image
                    src={el.image.path}
                    width={140}
                    height={123}
                    alt="image book"
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default book;