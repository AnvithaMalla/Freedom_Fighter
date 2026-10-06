from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database import Base


class Area(Base):
    __tablename__ = "areas"

    area_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    area_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    district_id: Mapped[int] = mapped_column(
        ForeignKey("districts.district_id"),
        nullable=False,
    )

    district = relationship(
        "District",
        back_populates="areas",
    )

    persons = relationship(
        "Person",
        back_populates="area",
    )